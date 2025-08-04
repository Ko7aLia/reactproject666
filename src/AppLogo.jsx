import mainLogo from './assets/logotype.svg'
import star from './assets/star.svg'

function MainLogo() {
    

  return (
    <>

      <header className='place-items-center text-white'>
    
              <img src={mainLogo} className='mt-10 mb-20' alt="Main logo" />
            
              <p className='m-0 p-0 font-normal'>Ваш баланс:</p>
              <p className='m-0 p-0 font-bold text-[128px]'>100 500.96</p>
              
              <p className='flex gap-1 font-medium'> <img src={star} alt="star" />Бонусов</p>
      </header>
      

    </>
  )
}

export default MainLogo
