const ORDER_STATUS_TYPE = [
  {
    type: 0,
    content: 'Chờ xử lý',
    color: 'volcano',
  },
  {
    type: 1,
    content: 'Đã xác nhận',
    color: 'geekblue',
  },
  {
    type: 2,
    content: 'Đang giao hàng',
    color: 'cyan',
  },
  {
    type: 3,
    content: 'Trả hàng',
    color: 'red',
  },
  {
    type: 4,
    content: 'Đã giao',
    color: 'green',
  },
];
export const ORDER_STATUS = (type) => {
  return ORDER_STATUS_TYPE[type];
};
