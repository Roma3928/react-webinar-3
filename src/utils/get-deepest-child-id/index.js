export const getDeepestChildId = (item) => {
  while (item.children && item.children.length > 0) {
    item = item.children[item.children.length - 1];
  }
  return item._id;
};
