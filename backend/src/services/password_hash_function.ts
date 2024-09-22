import argon2 from 'argon2';

export async function passwordHashGenerator (user_password: string) {

  
  try {
    const hash = await argon2.hash(user_password)

    return hash;
  }
  catch (error) {
    console.error(error);
    return null;
  }
}