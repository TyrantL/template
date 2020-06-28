const u = navigator.userAgent;

export const isInWechat = u.toLowerCase().indexOf('micromessenger') > -1;

export const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

export const isInKuaizhan = window.location.href.match(/kuaizhan/);

export const isInApp =
  !!window.dsBridge.call('getStorage', { key: 'app_version' }) ||
  window.location.href.match('inapp=1');

export function getParamFromUrl(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  return r ? decodeURIComponent(r[2]) : '';
}

export const inviteCode = getParamFromUrl('inviteCode') || getParamFromUrl('ic');
