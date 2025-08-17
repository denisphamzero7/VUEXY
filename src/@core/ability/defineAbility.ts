// src/ability/defineAbility.js
import { AbilityBuilder, createMongoAbility } from '@casl/ability'

// Note: AuthUser type removed (JS). Expect `user` to be an object with fields like:
// { id, username, role: { name, permissions }, companyId, ... }

export function defineAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility)

  if (!user) {
    // Guest user - no permissions
    return build()
  }

  console.log('Building abilities for user:', user.username, 'with role:', user.role?.name)
  console.log('User role object:', user.role)
  console.log('User permissions:', user.role?.permissions)

  // Admin gets all permissions (check for both 'admin' and 'a' as admin role)
  if (user.role?.name === 'admin' || user.role?.name === 'a') {
    console.log('Applying admin permissions - full access')
    can('manage', 'all')
    
    return build()
  }

  // Process role permissions (expected shape: [{ action, subject, conditions, inverted }, ...])
  const permissions = user.role?.permissions || []

  permissions.forEach(permission => {
    const { action, subject, conditions, inverted } = permission

    if (inverted) {
      // Deny rule
      cannot(action, subject, conditions)
    } else {
      // Allow rule
      can(action, subject, conditions)
    }
  })

  // Apply dynamic rules based on user context
  applyDynamicRules(can, cannot, user)

  return build()
}

function applyDynamicRules(can, cannot, user) {
  // User can always read their own profile
  if (user && user.id) {
    can('read', 'User', { id: user.id })
  }

  // Company-based permissions
  if (user.companyId) {
    can('read', 'User', { companyId: user.companyId })
    can('read', 'Role', { companyId: user.companyId })
    can('read', 'Permission', { companyId: user.companyId })
  }

  console.log('Processing role-based permissions for role:', user.role?.name)

  switch (user.role?.name) {
  case 'manager':
    console.log('Applying manager permissions')

    // Managers can manage users in their company
    can('manage', 'User', { companyId: user.companyId })
    can('read', 'Dashboard')
    can('read', 'User')
    break

  case 'user':
    console.log('Applying user permissions - read only')
    can('read', 'Dashboard')
    can('read', 'User')

    // Explicitly deny other permissions for regular users
    cannot('create', 'User')
    cannot('update', 'User')
    cannot('delete', 'User')
    break

  case 'moderator':
    console.log('Applying moderator permissions')
    can(['read', 'update'], 'User')
    can(['read', 'update'], 'Role')
    cannot('delete', 'User')
    cannot('delete', 'Role')
    break

  default:
    console.log('No specific role found, applying default permissions')
    can('read', 'Dashboard')
    can('read', 'User')
    break
  }
}

// Utility function to check if user can perform action on specific resource
export function canPerformAction(user, action, subject, resource) {
  const ability = defineAbilityFor(user)

  if (resource) {
    return ability.can(action, subject, resource)
  }

  return ability.can(action, subject)
}

// Utility function to get user's permissions for a specific subject
export function getUserPermissionsForSubject(user, subject) {
  const ability = defineAbilityFor(user)
  const actions = ['create', 'read', 'update', 'delete']

  return actions.filter(action => ability.can(action, subject))
}

// Utility function to filter resources based on user permissions
export function filterResourcesByPermission(user, resources, action, subject) {
  const ability = defineAbilityFor(user)

  return resources.filter(resource => {
    try {
      return ability.can(action, subject, resource)
    } catch {
      return ability.can(action, subject)
    }
  })
}
