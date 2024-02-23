import { Services } from "@/utils/HomeServices";
import Navbar from "./(Home)/Navbar";
import HomeComponent from "./(Home)/Navbar/home";
import Feature from "./(Home)/Feature";
import Actions from "./(Home)/ActionsBtn";
import Footer from "./(Home)/Footer";
export default function Home() {
  return (
    <>
      <div className="w-full 2xl:px-36 bg-home-img bg-bottom overflow-hidden  h-[100vh]  px-6 sm:px-10 py-5 bg-contain bg-no-repeat  bg-[rgb(64,78,237)]">
        <Navbar />
        <HomeComponent />
      </div>
      {
        Services.map((item, i) => (
          <Feature
            key={i}
            index={i}
            img={item.img}
            title={item.title}
            description={item.description}
          />
        ))
      }
      <Actions />
      <Footer />
    </>
  );
}
