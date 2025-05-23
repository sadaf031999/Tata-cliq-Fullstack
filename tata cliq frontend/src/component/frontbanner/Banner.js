import mainbanner from "../../assets/mainbanner.png"

function Banner() {
  return (
    <div className="flex items-center justify-center mt-5 ml-5 w-1000px">
  <img src={mainbanner} alt="Main banner" className="w-[1200px]" />
</div>

  )
}

export default Banner

