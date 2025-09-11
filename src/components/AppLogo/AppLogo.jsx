import mainLogo from '../../assets/logotype.svg'
import star from '../../assets/star.svg'
import DragSvgLock from '../../components/DragSvgLock/DragSvgLock.jsx'

import Bonuses from '../../components/Bonuses/Bonuses.jsx'

function MainLogo() {
    
    const defaultArrayName = "bonusArray1";

  return (
    <>

      <header className="adapt flex flex-col text-white">

              <DragSvgLock>
                      <img src={mainLogo} className="mt-[20px] mb-[40px] md:mb-[108px]" alt="Main logo" />
              </DragSvgLock>
                      <p className="m-0 p-0 font-normal opacity-[80%]">Ваш баланс:</p>
                      <div className="m-0 p-0 whitespace-nowrap leading-[100px] font-semibold text-[72px] md:text-[128px]"><Bonuses arrayName={defaultArrayName}/></div>
              <DragSvgLock>
                      <p className="mt-[8px] mb-[56px] flex gap-1 font-medium"> <img src={star} alt="star" />Бонусов</p>
              </DragSvgLock>
      </header>
      

    </>
  )
}

export default MainLogo
