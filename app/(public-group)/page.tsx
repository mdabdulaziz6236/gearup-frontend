import { ModeToggle } from "@/components/theme/toggleButton";
import { getMe } from "@/service/getMe";

export default async function Home() {
  const myProfile=await getMe()
  console.log(myProfile)
  return <>
  <h1 className="text-2xl dark:text-5xl dark:text-green-400 text-accent-foreground">Hello Gear Up Frontend Developer</h1>
  <ModeToggle></ModeToggle>
  <div>
    <h1>My Name: {myProfile.data.fullName}</h1>
  </div>

  </>
}
