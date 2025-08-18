import { icon } from "@/views/demos/components/badge/demoCodeBadge"

export default [
  { heading: 'MyHau' },
  {
    title: 'MyHau',
    icon: { icon: 'tabler-chart-donut-2' },
    children: [
        
      { title: 'Sơ yếu lí lịch', to: 'pages-my-profile', params: { tab: 'profile' } },
      { title: 'Cài đặt tài khoản người dùng', to: { name: 'pages-account-new-settings-tab', params: { tab: 'newaccount' } } },
      { title: 'Định giá mới', to: 'pages-pricingnew' },
      { title: 'FAQ1', to: 'pages-faqnew' },
      { title: 'Đăng nhập', to: 'pages-loginview' },
      { title: 'Quản lý người dùng',
        icon: { icon: 'tabler-user' },
        children: [
          { title: 'Danh sách người dùng', to: 'pages-user-list' },
          { title: 'Thêm người dùng', to: 'pages-user-adduser' },
          { title: 'Thêm người dùng', to: 'pages-user-detailuser' },
        ],
      },
      
      {
        title: 'Vai trò & Phân quyền',
        icon: { icon: 'tabler-lock' },
        children: [
          { title: 'Vai trò', to: 'apps-newroles' },
          { title: 'Phân quyền', to: 'apps-newpermissions' },
        ],
      },
      { title: 'Báo cáo',
        icon: { icon: 'tabler-files' },
        children: [
          {
            title: 'Báo cáo',
            to: 'pages-baocao',
            target: '_blank',
          },
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
