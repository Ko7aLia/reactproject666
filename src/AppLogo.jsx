import mainLogo from './assets/logotype.svg'
import star from './assets/star.svg'

function MainLogo() {
    

  return (
    <>

      <header className='place-items-center text-white'>
    
              <img src={mainLogo} className='mt-[20px] mb-[40px] md:mb-[108px]' alt="Main logo" />
            
              <p className='m-0 p-0 font-normal'>Ваш баланс:</p>
              <p className='m-0 p-0 leading-[100px] font-semibold text-[72px] md:text-[128px]'>75 904.06</p>
              
              <p className='mt-[8px] mb-[56px] flex gap-1 font-medium'> <img src={star} alt="star" />Бонусов</p>
      </header>
      

    </>
  )
}

export default MainLogo
