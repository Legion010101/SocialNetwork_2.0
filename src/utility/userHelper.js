export const updateObjectInArray = (
  items,
  itemId,
  objPropName,
  objNewProps,
  subscription,
) => {
  return items.map((user) => {
    if (user[objPropName] === itemId && user.followed === subscription) {
      return {
        ...user,
        followed: objNewProps,
      }
    }
    return user
  })
}
