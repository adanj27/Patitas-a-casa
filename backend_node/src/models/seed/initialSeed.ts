import { USERADMIN } from "../../helpers";
import { ROL_TYPE } from "../../interface/props/RolInterface";
import { RolRepository, UserRepository } from "../repositorie";

const Rol = new RolRepository();
const User = new UserRepository();
export async function createRoles() {
  try {
    const count = await Rol.count();

    if (count > 0) return "Alredy have rol";

    const values = await Promise.all([
      Rol.create({ name: USERADMIN.ROL }),
      Rol.create({ name: ROL_TYPE.admin }),
      Rol.create({ name: ROL_TYPE.editor }),
      Rol.create({ name: ROL_TYPE.user }),
    ]);
    console.log("termino roles");
    return values;
  } catch (error) {
    throw Error(error);
  }
}

export async function createSuperAdmin() {
  try {
    const count = await User.count();

    if (count > 0) return "Already Exist";

    const findRol = await Rol.getByOne({ name: USERADMIN.ROL });

    const admin = await User.create({
      first_name: USERADMIN.NAME,
      last_name: USERADMIN.LAST,
      alias: USERADMIN.ALIAS,
      email: USERADMIN.EMAIL,
      password: USERADMIN.PASS,
      rol: findRol._id,
    });

    await admin.save();

    console.log("user ready!");
    return "created!";
  } catch (error) {
    throw Error(error);
  }
}
