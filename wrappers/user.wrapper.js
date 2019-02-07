import Wrapper from '.'

class UserWrapper extends Wrapper {
  toWeb() {
    const values = Object.assign({}, this)
    delete values.password

    return values
  }
}

export default UserWrapper
