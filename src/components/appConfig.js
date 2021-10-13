export const appInfo = {
    title: '声学成像模块监控面板',
  };

  export  const uiOptions = {
    appBarTheme: 'dark',
    //appBarTheme: 'light',
  };

  export const gwPickMode = 'addr-list'; /* 从配置文件加载网关主机列表 */
  // const gwPickMode = 'doc-location'; /* 以当前页面所在主机作为网关地址 */

  // 可选的网关地址列表
  export const gwAddresses = ['192.168.1.151', '192.168.1.152', '192.168.1.153', '192.168.1.154'];
  // const gwAddresses = [];