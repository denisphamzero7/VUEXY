import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'
import eventLabel from '@images/icons/project-icons/event.png'
import figmaLabel from '@images/icons/project-icons/figma.png'
import htmlLabel from '@images/icons/project-icons/html5.png'
import reactLabel from '@images/icons/project-icons/react.png'
import socialLabel from '@images/icons/project-icons/social.png'
import supportLabel from '@images/icons/project-icons/support.png'
import twitterLabel from '@images/icons/project-icons/twitter.png'
import vueLabel from '@images/icons/project-icons/vue.png'
import xdLabel from '@images/icons/project-icons/xd.png'
import UserProfileHeaderBg from '@images/pages/user-profile-header-bg.png'

export const db = {
  data: {
    profileHeader: {
      fullName: 'John Doe',
      location: 'Thành phố Vatican',
      joiningDate: 'Tham gia tháng 4, 2021',
      designation: 'Nhà thiết kế UX',
      profileImg: avatar1,
      coverImg: UserProfileHeaderBg,
    },
    profile: {
      about: [
        { property: 'Họ và tên', value: 'John Doe', icon: 'tabler-user' },
        { property: 'Trạng thái', value: 'Đang hoạt động', icon: 'tabler-check' },
        { property: 'Vai trò', value: 'Lập trình viên', icon: 'tabler-crown' },
        { property: 'Quốc gia', value: 'Hoa Kỳ', icon: 'tabler-flag' },
        { property: 'Ngôn ngữ', value: 'Tiếng Anh', icon: 'tabler-language' },
      ],
      contacts: [
        { property: 'Liên hệ', value: '(123) 456-7890', icon: 'tabler-phone-call' },
        { property: 'Skype', value: 'john.doe', icon: 'tabler-messages' },
        { property: 'Email', value: 'john.doe@example.com', icon: 'tabler-mail' },
      ],
      teams: [
        { property: 'Lập trình viên Backend', value: '(126 thành viên)', icon: 'tabler-brand-github', color: 'secondary' },
        { property: 'Lập trình viên VueJS', value: '(98 thành viên)', icon: 'tabler-brand-vue', color: 'success' },
      ],
      overview: [
        { property: 'Nhiệm vụ hoàn thành', value: '13.5k', icon: 'tabler-check' },
        { property: 'Kết nối', value: '897', icon: 'tabler-users' },
        { property: 'Dự án hoàn thành', value: '146', icon: 'tabler-layout-grid' },
      ],
      connections: [
        {
          isFriend: false,
          connections: '45',
          name: 'Cecilia Payne',
          avatar: avatar2,
        },
        {
          isFriend: true,
          connections: '1.32k',
          name: 'Curtis Fletcher',
          avatar: avatar3,
        },
        {
          isFriend: true,
          connections: '125',
          name: 'Alice Stone',
          avatar: avatar4,
        },
        {
          isFriend: false,
          connections: '456',
          name: 'Darrell Barnes',
          avatar: avatar5,
        },
        {
          isFriend: false,
          connections: '1.2k',
          name: 'Eugenia Moore',
          avatar: avatar8,
        },
      ],
      teamsTech: [
        {
          members: 72,
          ChipColor: 'error',
          chipText: 'Lập trình viên',
          title: 'Lập trình viên React',
          avatar: reactLabel,
        },
        {
          members: 122,
          chipText: 'Hỗ trợ',
          ChipColor: 'primary',
          title: 'Nhóm hỗ trợ',
          avatar: supportLabel,
        },
        {
          members: 7,
          ChipColor: 'info',
          chipText: 'Thiết kế',
          title: 'Thiết kế UI',
          avatar: figmaLabel,
        },
        {
          members: 289,
          ChipColor: 'error',
          chipText: 'Lập trình viên',
          title: 'Lập trình viên Vue.js',
          avatar: vueLabel,
        },
        {
          members: 24,
          chipText: 'Marketing',
          ChipColor: 'secondary',
          title: 'Marketing Kỹ thuật số',
          avatar: twitterLabel,
        },
      ],
    },
    teams: [
      {
        extraMembers: 25,
        title: 'Nhóm Lập trình React',
        avatar: reactLabel,
        avatarGroup: [
          { avatar: avatar1, name: 'Vinnie Mostowy' },
          { avatar: avatar2, name: 'Allen Rieske' },
          { avatar: avatar3, name: 'Julee Rossignol' },
          { avatar: avatar4, name: 'George Burrill' },
        ],
        description: 'Chúng tôi không đưa ra giả định về phần còn lại của stack công nghệ của bạn, vì vậy bạn có thể phát triển các tính năng mới bằng React.',
        chips: [
          {
            title: 'React',
            color: 'primary',
          },
          {
            title: 'MUI',
            color: 'info',
          },
        ],
      },
      {
        extraMembers: 15,
        title: 'Nhóm phát triển Vue.js',
        avatar: vueLabel,
        avatarGroup: [
          { avatar: avatar5, name: 'Kaith D\'souza' },
          { avatar: avatar6, name: 'John Doe' },
          { avatar: avatar7, name: 'Alan Walker' },
          { avatar: avatar8, name: 'Calvin Middleton' },
        ],
        description: 'Việc phát triển Vue và hệ sinh thái của nó được hướng dẫn bởi một nhóm quốc tế, một số người trong đó đã chọn xuất hiện ở dưới đây.',
        chips: [
          {
            title: 'Vuejs',
            color: 'success',
          },
          {
            color: 'error',
            title: 'Lập trình viên',
          },
        ],
      },
      {
        extraMembers: 55,
        title: 'Nhóm Nhà thiết kế',
        avatar: xdLabel,
        avatarGroup: [
          { avatar: avatar1, name: 'Hau' },
          { avatar: avatar2, name: 'thương' },
          { avatar: avatar3, name: 'Hoài' },
          { avatar: avatar4, name: 'hương' },
        ],
        description: 'Một nhóm thiết kế hoặc sản phẩm không chỉ là những người trong đó. Nhóm bao gồm con người, vai trò họ đóng và sự hợp tác mà họ tạo ra.',
        chips: [
          {
            title: 'Sketch',
            color: 'warning',
          },
          {
            title: 'XD',
            color: 'error',
          },
        ],
      },
      {
        extraMembers: 35,
        title: 'Nhóm hỗ trợ',
        avatar: supportLabel,
        avatarGroup: [
          { avatar: avatar5, name: 'Andrew Tye' },
          { avatar: avatar6, name: 'Rishi Swaat' },
          { avatar: avatar7, name: 'Rossie Kim' },
          { avatar: avatar8, name: 'Mary Hunter' },
        ],
        description: 'Hỗ trợ nhóm của bạn. Đội hỗ trợ khách hàng của bạn xử lý mọi tình huống tốt, xấu và xấu xí hàng ngày.',
        chips: [
          {
            color: 'info',
            title: 'Zendesk',
          },
        ],
      },
      {
        extraMembers: 19,
        title: 'Marketing Kỹ thuật số',
        avatar: socialLabel,
        avatarGroup: [
          { avatar: avatar1, name: 'Kim Merchent' },
          { avatar: avatar2, name: 'Sam D\'souza' },
          { avatar: avatar3, name: 'Nurvi Karlos' },
          { avatar: avatar4, name: 'Margorie Whitmire' },
        ],
        description: 'Marketing kỹ thuật số là quảng cáo được phân phối qua các kênh kỹ thuật số như công cụ tìm kiếm, website và ứng dụng di động.',
        chips: [
          {
            color: 'primary',
            title: 'Twitter',
          },
          {
            title: 'Email',
            color: 'success',
          },
        ],
      },
      {
        title: 'Sự kiện',
        extraMembers: 55,
        avatar: eventLabel,
        avatarGroup: [
          { avatar: avatar5, name: 'Vinnie Mostowy' },
          { avatar: avatar6, name: 'Allen Rieske' },
          { avatar: avatar7, name: 'Julee Rossignol' },
          { avatar: avatar8, name: 'Daniel Long' },
        ],
        description: 'Sự kiện được định nghĩa là một cuộc thi cụ thể thuộc một chương trình các cuộc thi. Ví dụ: cuộc thi nhảy xa.',
        chips: [
          {
            title: 'Hubilo',
            color: 'success',
          },
        ],
      },
      {
        extraMembers: 45,
        title: 'Tài nguyên Figma',
        avatar: figmaLabel,
        avatarGroup: [
          { avatar: avatar1, name: 'Andrew Mostowy' },
          { avatar: avatar2, name: 'Micky Ressula' },
          { avatar: avatar3, name: 'Michel Pal' },
          { avatar: avatar4, name: 'Herman Lockard' },
        ],
        description: 'Khám phá, cài đặt, sử dụng và chỉnh sửa hàng nghìn plugin và file được xuất bản lên Cộng đồng Figma bởi các nhà thiết kế và nhà phát triển.',
        chips: [
          {
            title: 'UI/UX',
            color: 'success',
          },
          {
            title: 'Figma',
            color: 'secondary',
          },
        ],
      },
      {
        extraMembers: 3,
        title: 'Ứng dụng di động native',
        avatar: reactLabel,
        avatarGroup: [
          { avatar: avatar1, name: 'Andrew Mostowy' },
          { avatar: avatar2, name: 'Micky Ressula' },
          { avatar: avatar3, name: 'Michel Pal' },
          { avatar: avatar4, name: 'Herman Lockard' },
        ],
        description: 'React Native cho phép bạn tạo ứng dụng native thân thiện với người dùng và không làm suy giảm trải nghiệm người dùng. Với framework mạnh mẽ của nó.',
        chips: [
          {
            title: 'React',
            color: 'primary',
          },
        ],
      },
      {
        extraMembers: 50,
        title: 'Chỉ người mới bắt đầu',
        avatar: htmlLabel,
        avatarGroup: [
          { avatar: avatar5, name: 'Kim Karlos' },
          { avatar: avatar6, name: 'Katy Turner' },
          { avatar: avatar7, name: 'Peter Adward' },
          { avatar: avatar8, name: 'Leona Miller' },
        ],
        description: 'Tìm hiểu cơ bản về cách website hoạt động, front-end vs back-end và sử dụng trình soạn mã. Học HTML, CSS cơ bản và…',
        chips: [
          {
            title: 'CSS',
            color: 'info',
          },
          {
            title: 'HTML',
            color: 'warning',
          },
        ],
      },
    ],
    projects: [
      {
        daysLeft: 28,
        comments: 15,
        totalTask: 344,
        hours: '380/244',
        tasks: '290/344',
        budget: '$18.2k',
        completedTask: 328,
        deadline: '28/2/22',
        chipColor: 'success',
        startDate: '14/2/21',
        budgetSpent: '$24.8k',
        members: '280 thành viên',
        title: 'Banner mạng xã hội',
        client: 'Christian Jimenez',
        avatar: socialLabel,
        description: 'Chúng tôi cung cấp dịch vụ Tư vấn, Phát triển Phần mềm và Phát triển Web.',
        avatarGroup: [
          { avatar: avatar1, name: 'Vinnie Mostowy' },
          { avatar: avatar2, name: 'Allen Rieske' },
          { avatar: avatar3, name: 'Julee Rossignol' },
        ],
      },
      {
        daysLeft: 15,
        comments: 236,
        totalTask: 90,
        tasks: '12/90',
        hours: '98/135',
        budget: '$1.8k',
        completedTask: 38,
        deadline: '21/6/22',
        budgetSpent: '$2.4k',
        chipColor: 'warning',
        startDate: '18/8/21',
        members: '1.1k thành viên',
        title: 'Mẫu quản trị',
        client: 'Jeffrey Phillips',
        avatar: reactLabel,
        avatarGroup: [
          { avatar: avatar4, name: 'Kaith D\'souza' },
          { avatar: avatar5, name: 'John Doe' },
          { avatar: avatar6, name: 'Alan Walker' },
        ],
        description: 'Thời gian là tài sản vô giá nhất của chúng ta, vì vậy chúng tôi muốn giúp bạn tiết kiệm bằng cách tạo ra…',
      },
      {
        daysLeft: 45,
        comments: 98,
        budget: '$420',
        totalTask: 140,
        tasks: '22/140',
        hours: '880/421',
        completedTask: 95,
        chipColor: 'error',
        budgetSpent: '$980',
        deadline: '8/10/21',
        title: 'Thiết kế ứng dụng',
        startDate: '24/7/21',
        members: '458 thành viên',
        client: 'Ricky McDonald',
        avatar: vueLabel,
        description: 'Thiết kế ứng dụng kết hợp giao diện người dùng (UI) và trải nghiệm người dùng (UX).',
        avatarGroup: [
          { avatar: avatar7, name: 'Jimmy Ressula' },
          { avatar: avatar8, name: 'Kristi Lawker' },
          { avatar: avatar1, name: 'Danny Paul' },
        ],
      },
      {
        comments: 120,
        daysLeft: 126,
        totalTask: 420,
        budget: '2.43k',
        tasks: '237/420',
        hours: '1.2k/820',
        completedTask: 302,
        deadline: '12/9/22',
        budgetSpent: '$8.5k',
        chipColor: 'warning',
        startDate: '10/2/19',
        members: '137 thành viên',
        client: 'Hulda Wright',
        title: 'Tạo Website',
        avatar: htmlLabel,
        description: 'Tên miền của bạn nên phản ánh sản phẩm hoặc dịch vụ để... ',
        avatarGroup: [
          { avatar: avatar2, name: 'Andrew Tye' },
          { avatar: avatar3, name: 'Rishi Swaat' },
          { avatar: avatar4, name: 'Rossie Kim' },
        ],
      },
      {
        daysLeft: 5,
        comments: 20,
        totalTask: 285,
        tasks: '29/285',
        budget: '28.4k',
        hours: '142/420',
        chipColor: 'error',
        completedTask: 100,
        deadline: '25/12/21',
        startDate: '12/12/20',
        members: '82 thành viên',
        budgetSpent: '$52.7k',
        client: 'Jerry Greene',
        title: 'Bảng điều khiển Figma',
        avatar: figmaLabel,
        description: 'Sử dụng mẫu này để tổ chức dự án thiết kế của bạn. Một số tính năng chính bao gồm…',
        avatarGroup: [
          { avatar: avatar5, name: 'Kim Merchent' },
          { avatar: avatar6, name: 'Sam D\'souza' },
          { avatar: avatar7, name: 'Nurvi Karlos' },
        ],
      },
      {
        daysLeft: 4,
        comments: 16,
        budget: '$655',
        totalTask: 290,
        tasks: '29/290',
        hours: '580/445',
        completedTask: 290,
        budgetSpent: '$1.3k',
        chipColor: 'success',
        deadline: '02/11/21',
        startDate: '17/8/21',
        title: 'Thiết kế logo',
        members: '16 thành viên',
        client: 'Olive Strickland',
        avatar: xdLabel,
        description: 'Thiết kế logo cao cấp do các nhà thiết kế hàng đầu tạo ra. Tạo dựng thương hiệu cho doanh nghiệp.',
        avatarGroup: [
          { avatar: avatar8, name: 'Kim Karlos' },
          { avatar: avatar1, name: 'Katy Turner' },
          { avatar: avatar2, name: 'Peter Adward' },
        ],
      },
    ],
    connections: [
      {
        tasks: '834',
        projects: '18',
        isConnected: true,
        connections: '129',
        name: 'Mark Gilbert',
        designation: 'Thiết kế UI',
        avatar: avatar1,
        chips: [
          {
            title: 'Figma',
            color: 'secondary',
          },
          {
            title: 'Sketch',
            color: 'warning',
          },
        ],
      },
      {
        tasks: '2.31k',
        projects: '112',
        isConnected: false,
        connections: '1.28k',
        name: 'Eugenia Parsons',
        designation: 'Lập trình viên',
        avatar: avatar2,
        chips: [
          {
            color: 'error',
            title: 'Angular',
          },
          {
            color: 'info',
            title: 'React',
          },
        ],
      },
      {
        tasks: '1.25k',
        projects: '32',
        isConnected: false,
        connections: '890',
        name: 'Francis Byrd',
        designation: 'Lập trình viên',
        avatar: avatar3,
        chips: [
          {
            title: 'HTML',
            color: 'primary',
          },
          {
            color: 'info',
            title: 'React',
          },
        ],
      },
      {
        tasks: '12.4k',
        projects: '86',
        isConnected: false,
        connections: '890',
        name: 'Leon Lucas',
        designation: 'Thiết kế UI/UX',
        avatar: avatar4,
        chips: [
          {
            title: 'Figma',
            color: 'secondary',
          },
          {
            title: 'Sketch',
            color: 'warning',
          },
          {
            color: 'primary',
            title: 'Photoshop',
          },
        ],
      },
      {
        tasks: '23.8k',
        projects: '244',
        isConnected: true,
        connections: '2.14k',
        name: 'Jayden Rogers',
        designation: 'Full Stack Developer',
        avatar: avatar5,
        chips: [
          {
            color: 'info',
            title: 'React',
          },
          {
            title: 'HTML',
            color: 'warning',
          },
          {
            color: 'success',
            title: 'Node.js',
          },
        ],
      },
      {
        tasks: '1.28k',
        projects: '32',
        isConnected: false,
        designation: 'SEO',
        connections: '1.27k',
        name: 'Jeanette Powell',
        avatar: avatar6,
        chips: [
          {
            title: 'Analysis',
            color: 'secondary',
          },
          {
            color: 'success',
            title: 'Writing',
          },
        ],
      },
    ],
  },
  projectTable: [
    {
      id: 1,
      status: 38,
      leader: 'Eileen',
      name: 'SEO Website',
      date: '10 may 2021',
      avatarColor: 'success',
      avatarGroup: [avatar1, avatar2, avatar3, avatar4],
    },
    {
      id: 2,
      status: 45,
      leader: 'Owen',
      date: '03 Jan 2021',
      name: 'Banner mạng xã hội',
      avatar: socialLabel,
      avatarGroup: [avatar5, avatar6],
    },
    {
      id: 3,
      status: 92,
      leader: 'Keith',
      date: '12 Aug 2021',
      name: 'Thiết kế logo',
      avatar: '/images/icons/project-icons/sketch-label.png',
      avatarGroup: [avatar7, avatar8, avatar1, avatar2],
    },
    {
      id: 4,
      status: 56,
      leader: 'Merline',
      date: '19 Apr 2021',
      name: 'Thiết kế ứng dụng iOS',
      avatar: '/images/icons/project-icons/sketch-label.png',
      avatarGroup: [avatar3, avatar4, avatar5, avatar6],
    },
    {
      id: 5,
      status: 25,
      leader: 'Harmonia',
      date: '08 Apr 2021',
      name: 'Bảng điều khiển Figma',
      avatar: figmaLabel,
      avatarGroup: [avatar7, avatar8, avatar1],
    },
    {
      id: 6,
      status: 36,
      leader: 'Allyson',
      date: '29 Sept 2021',
      name: 'Quản trị Crypto',
      avatar: htmlLabel,
      avatarGroup: [avatar2, avatar3, avatar4, avatar5],
    },
    {
      id: 7,
      status: 72,
      leader: 'Georgie',
      date: '20 Mar 2021',
      name: 'Tạo Website',
      avatar: reactLabel,
      avatarGroup: [avatar6, avatar7, avatar8, avatar1],
    },
    {
      id: 8,
      status: 89,
      leader: 'Fred',
      date: '09 Feb 2021',
      name: 'Thiết kế ứng dụng',
      avatar: xdLabel,
      avatarGroup: [avatar2, avatar3, avatar4, avatar5],
    },
    {
      id: 9,
      status: 77,
      leader: 'Richardo',
      date: '17 June 2021',
      name: 'API Angular',
      avatar: figmaLabel,
      avatarGroup: [avatar6, avatar7, avatar8, avatar1],
    },
    {
      id: 10,
      status: 100,
      leader: 'Genevra',
      date: '06 Oct 2021',
      name: 'Mẫu quản trị',
      avatar: vueLabel,
      avatarGroup: [avatar2, avatar3, avatar4, avatar5],
    },
  ],
}
