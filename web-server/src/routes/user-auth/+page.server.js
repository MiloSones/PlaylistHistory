export async function load( {locals }) {

    const user = locals.user;
    return {user};
}

export const actions = {
    logout: async ({cookies}) => {
      cookies.delete("AuthorizationToken");
      throw  redirect(302, "/user-auth");
    }
  }