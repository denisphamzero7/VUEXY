export default [
  { heading: 'Quản lý báo cáo' },

  {
    title: 'Báo cáo',
    icon: { icon: 'tabler-file' },
    skipPermission: true,
    children: [
      // Mẫu báo cáo
      // link chỗ page chứ không phải view nhé
      {
        title: 'Mẫu báo cáo',
        icon: { icon: 'tabler-template' },
        navActiveLink: 'apps-form-template-list-target',
        to: { name: 'apps-form-templates-list-target', params: { target: 'all' } },
        skipPermission: true,
      },
    ],
  },
]


//   // Đợt báo cáo
//   {
//     title: 'menus.all_batches',
//     icon: { icon: 'tabler-calendar-clock' },
//     navActiveLink: 'apps-report-batches-list-target',
//     to: { name: 'apps-report-batches-list-target', params: { target: 'all' } },
//     skipPermission: true,
//   },

//   // Danh sách báo cáo
//   {
//     title: 'menus.report_submissions',
//     icon: { icon: 'tabler-files' },
//     skipPermission: true,
//     children: [
//       // {
//       //     title: 'menus.list_report_submissions',
//       //     navActiveLink: 'apps-report-submissions-reporting',
//       //     to: {name: 'apps-report-submissions-target', params: {target: 'reporting'}},
//       //     skipPermission: true,
//       // },
//       {
//         title: 'menus.report_submissions_list',
//         navActiveLink: 'apps-report-submissions-managing',
//         to: { name: 'apps-report-submissions-target', params: { target: 'managing' } },
//         skipPermission: true,
//       },
//     ],
//   },

//   // Danh mục
//   {
//     title: 'menus.catalogs',
//     icon: { icon: 'tabler-notebook' },
//     skipPermission: true,
//     children: [
//       {
//         title: 'menus.report_categories',
//         icon: { icon: 'tabler-category-2' },
//         to: 'apps-report-categories',
//         skipPermission: true,
//       },
//       {
//         title: 'menus.user_groups',
//         icon: { icon: 'tabler-users-group' },
//         to: 'apps-user-groups-list',
//         skipPermission: true,
//       },
//       {
//         title: 'menus.shared_catalogs',
//         icon: { icon: 'tabler-books' },
//         to: 'apps-shared-catalogs-list', // Placeholder
//         skipPermission: true,
//       },
//     ],
//   },
// ]

//   },

// Quản lý thông báo
//   {
//     title: 'menus.notification_management',
//     icon: { icon: 'tabler-bell' },
//     skipPermission: true,
//     children: [
//       {
//         title: 'menus.add_notification',
//         icon: { icon: "tabler-bell-plus", size: "16" },
//         to: { name: 'apps-notifications-add' },
//         skipPermission: true,
//       },
//       {
//         title: 'menus.all_notifications',
//         icon: { icon: "tabler-bell-ringing", size: "16" },
//         to: { name: 'apps-notifications' },
//         skipPermission: true,
//       },
//       {
//         title: 'menus.notification_types',
//         icon: { icon: "tabler-bell-cog", size: "16" },
//         to: { name: 'apps-notification-categories' },
//         skipPermission: true,
//       },
//     ],
//   },

// Quản lý văn bản
// {
//   title: "menus.document_management",
//   icon: { icon: "tabler-file-text" },
//   skipPermission: true,
//   children: [
//     {
//       title: "menus.add_document",
//       icon: { icon: "tabler-file-plus", size: "16" },
//       to: { name: "apps-document-add" },
//       skipPermission: true,
//     },
//     {
//       title: "menus.all_documents",
//       icon: { icon: "tabler-files", size: "16" },
//       to: { name: "apps-document-all" },
//       skipPermission: true,
//     },
//     {
//       title: "menus.document_types",
//       icon: { icon: "tabler-file-settings", size: "16" },
//       to: { name: "apps-document-types" },
//       skipPermission: true,
//     },
//   ],
// },

//   {
//     title: 'menus.organization_info',
//     icon: { icon: 'tabler-building-bridge' },
//     to: { name: 'apps-report-organization-info-list' },
//     skipPermission: true,
//   },

// Quản lý thảo luận
// {
//   title: 'menus.discussion_management',
//   icon: { icon: 'tabler-messages' },
//   skipPermission: true,
//   children: [
//     {
//       title: 'menus.discussion_list',
//       icon: { icon: 'tabler-list' },
//       to: { name: 'apps-discussion-list' },
//       skipPermission: true,
//     },
//     {
//       title: 'menus.discussion_types',
//       icon: { icon: 'tabler-category-2' },
//       to: { name: 'apps-discussion-types' },
//       skipPermission: true,
//     },
//   ],
// },

