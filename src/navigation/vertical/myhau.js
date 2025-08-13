export default [
  { heading: 'MyHau' },
  {
    title: 'MyHau',
    icon: { icon: 'tabler-chart-donut-2' },
    children: [
        
      { title: 'Sơ yếu lí lịch', to: 'pages-my-profile', params: { tab: 'profile' } },
      { title: 'Cài đặt tài khoản người dùng', to: { name: 'pages-account-new-settings-tab', params: { tab: 'newaccount' } } },
      { title: 'Pricing new', to: 'pages-pricingnew' },
      { title: 'FAQ1', to: 'pages-faqnew' },
      {
        title: 'Vai trò & Phân quyền',
        icon: { icon: 'tabler-lock' },
        children: [
          { title: 'Vai trò', to: 'apps-newroles' },
          { title: 'Phân quyền', to: 'apps-newpermissions' },
        ],
      },
      {

        title: 'Dashboards',
        icon: { icon: 'tabler-smart-home' },
        children: [
          {
            title: 'About',
            to: 'page-about',
          },
          {
            title: 'Users',
            to: 'page-users',
          }
          ,
          {
            title: 'Analytics',
            to: 'newdashboards-analytics',
          },
     
          {
            title: 'CRM',
            to: 'newdashboards-crm',
          },
          {
            title: 'Ecommerce',
            to: 'newdashboards-ecommerce',
          },
         
        ],
   

      },
    ],
  },
]

// {
//   title: 'Ecommerce',
//   to: 'newdashboards-ecommerce',
// },

// {
//   title: 'Logistics',
//   to: 'newdashboards-logistics',
// },
