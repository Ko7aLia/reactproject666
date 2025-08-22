import mainLogo from './assets/logotype.svg'
import star from './assets/star.svg'
import DragSvgLock from './DragSvgLock.jsx'

function MainLogo() {
    

  return (
    <>

      <header className="adapt flex flex-col text-white">

              <DragSvgLock>
                      <img src={mainLogo} className="mt-[20px] mb-[40px] md:mb-[108px]" alt="Main logo" />
              </DragSvgLock>
                      <p className="m-0 p-0 font-normal">Ваш баланс:</p>
                      <p className="m-0 p-0 leading-[100px] font-semibold text-[72px] md:text-[128px]">75 904.06</p>
              <DragSvgLock>
                      <p className="mt-[8px] mb-[56px] flex gap-1 font-medium"> <img src={star} alt="star" />Бонусов</p>
              </DragSvgLock>
      </header>
      

    </>
  )
}

export default MainLogo
