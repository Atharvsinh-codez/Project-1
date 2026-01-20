import FloatingLogo from "./floating-logo";

const HeroLogos = () => {
  return (
    <>
      {/* YouTube */}
      <FloatingLogo
        src="/images/hero/Youtube.png"
        alt="Youtube logo"
        className="absolute h-[120px]"
        style={{ top: "18%", left: "12%" }}
        animateY={28}
        animateX={10}
        rotate={10}
        duration={4}
        initialShadow="drop-shadow(0px 20px 35px rgba(0,0,0,0.45)) drop-shadow(0px 8px 15px rgba(0,0,0,0.3))"
        deepShadow="drop-shadow(0px 35px 55px rgba(0,0,0,0.55)) drop-shadow(0px 15px 30px rgba(0,0,0,0.4))"
      />

      {/* Instagram */}
      <FloatingLogo
        src="/images/hero/Instagram.png"
        alt="Instagram logo"
        className="absolute h-[100px]"
        style={{ top: "8%", right: "14%" }}
        animateY={32}
        animateX={-12}
        rotate={14}
        duration={5}
        initialShadow="drop-shadow(0px 18px 30px rgba(0,0,0,0.45)) drop-shadow(0px 10px 20px rgba(0,0,0,0.32))"
        deepShadow="drop-shadow(0px 30px 55px rgba(0,0,0,0.55)) drop-shadow(0px 15px 30px rgba(0,0,0,0.42))"
      />

      {/* Spotify */}
      <FloatingLogo
        src="/images/hero/Spotify.png"
        alt="Spotify logo"
        className="absolute h-[130px]"
        style={{ top: "62%", left: "6%" }}
        animateY={38}
        animateX={14}
        rotate={18}
        duration={4.5}
        initialShadow="drop-shadow(0px 22px 40px rgba(0,0,0,0.5)) drop-shadow(0px 12px 25px rgba(0,0,0,0.35))"
        deepShadow="drop-shadow(0px 35px 65px rgba(0,0,0,0.58)) drop-shadow(0px 18px 35px rgba(0,0,0,0.45))"
      />

      {/* Twitch */}
      <FloatingLogo
        src="/images/hero/Twitch.png"
        alt="Twitch logo"
        className="absolute h-[135px]"
        style={{ top: "70%", right: "3%" }}
        animateY={42}
        animateX={-16}
        rotate={20}
        duration={6}
        initialShadow="drop-shadow(0px 24px 45px rgba(0,0,0,0.52)) drop-shadow(0px 15px 30px rgba(0,0,0,0.38))"
        deepShadow="drop-shadow(0px 40px 70px rgba(0,0,0,0.6)) drop-shadow(0px 22px 40px rgba(0,0,0,0.48))"
      />
    </>
  );
};

export default HeroLogos;
