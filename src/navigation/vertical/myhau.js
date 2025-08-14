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

        title: 'Bảng điều khiển',
        icon: { icon: 'tabler-smart-home' },
        children: [
          {
            title: 'Về',
            to: 'page-about',
          },
          {
            title: 'Người dùng',
            to: 'page-users',
          }
          ,
          {
            title: 'Phân tích',
            to: 'newdashboards-analytics',
          },
     
          {
            title: 'CRM',
            to: 'newdashboards-crm',
          },
          {
            title: 'Thương mại điện tử',
            to: 'newdashboards-ecommerce',
          },
           {
            title: 'Quản lý logistics',
            to: 'newdashboards-logistics',
          },
           {
            title: 'Học viên',
            to: 'newdashboards-newacademy',
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
