import {userType} from '../types/types'

type UserFormPropsKey = Extract<keyof userType, string>

type UpdateObjectInArray = (
  items: Array<userType>,
  itemId: number,
  objPropName: UserFormPropsKey,
  objNewProps: boolean,
  subscription: boolean,
) => Array<userType>

export const updateObjectInArray: UpdateObjectInArray = (
  items,
  itemId,
  objPropName,
  objNewProps,
  subscription,
) => {
  return items.map((user) => {
    if (
      user[objPropName as keyof userType] === itemId &&
      user.followed === subscription
    ) {
      return {
        ...user,
        followed: objNewProps,
      }
    }
    return user
  })
}
