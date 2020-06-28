import axios from '@/utils';

const api = {
  getShareUrl: 'item-center/cpsActivity/getShareUrl',
};

export default {
  getShareUrl: params => axios.get(api.getShareUrl, { params }),
};
