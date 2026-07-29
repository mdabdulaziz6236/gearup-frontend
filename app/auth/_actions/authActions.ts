'use server'

type RegisterState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
): Promise<any> => {
  const fullName = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = {
    fullName,
    email,
    password,
  };
  const url = process.env.BACKEND_API_URL
  console.log(url)
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

    return result;

};
