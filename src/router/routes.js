import Layout from '@/layout/index.vue'
import nested from './modules/nested'
import components from './modules/components'

/**
 * 注意：仅当路由子项数量 >= 1时，子菜单才会显示
 * 默认规则：当一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式
 *          当一个路由下面的 children 声明的路由只有1个时，会将该子路由当做根路由显示在侧边栏
 *
 * hidden: true                             当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1（默认为 false）
 * alwaysShow: true                         如果设置为 true，则会忽略之前定义的规则，不管路由下面的 children 声明的个数都显示你的根路由（默认为 false）
 * name: 'route-name'                       设定路由的名字，一定要填写不然使用 <KeepAlive> 时会出现各种问题
 * redirect: noRedirect                     如果设置为 noRedirect，则在面包屑中不会发生重定向
 * link: false                              外链标志
 * meta: {
          allowlist: true                   路由白名单，不登陆即可访问（默认为 false）
          code: 'code'                      路由 code，根据后端路由表进行动态筛选（仅 asyncRoutes 支持）
          title: 'title'                    设置该路由在侧边栏和面包屑中展示的名字（建议设置）
          icon: 'svg-name'                  侧边栏中显示的图标
          noCache: true                     如果设置为 true，则不会被 <KeepAlive> 缓存（默认为 false）
          activeMenu: '/example/list'       当路由设置了该属性，则会高亮相对应的侧边栏
                                            这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
                                            点击文章进入文章详情页，这时候路由为 /article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
          hideBreadcrumb: false             如果设置为 false，则不会在 breadcrumb 面包屑中显示（默认为 true）
        }
 */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      title: 'login',
      allowlist: true
    },
    hidden: true
  },

  {
    path: '/notfound',
    component: () => import('@/views/error/notfound.vue'),
    name: 'Notfound',
    meta: {
      title: 'Not Found',
      allowlist: true
    },
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'gauge-solid'
        }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    name: 'Permission',
    redirect: '/permission/page',
    alwaysShow: true,
    meta: {
      title: 'permission',
      icon: 'lock-solid',
      code: 'permission'
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          code: 'pagePermission'
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          code: 'rolePermission'
        }
      }
    ]
  },

  nested,
  components,

  // 添加 404 路由
  {
    path: '/:catchAll(.*)',
    redirect: '/notfound',
    hidden: true
  }
]
