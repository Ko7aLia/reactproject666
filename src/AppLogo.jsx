import mainLogo from './assets/logotype.svg'
import star from './assets/star.svg'

function MainLogo() {
    

  return (
    <>

      <header className='grid place-items-center text-white'>
    
              <img src={mainLogo} className='mb-20 mt-10' alt="Main logo" />
            
              <p className='m-0 p-0 font-normal'>Ваш баланс:</p>
              <p className='m-0 p-0 text-8xl font-bold'>100 500.96</p>
              
      </header>

      <div className='mb-10 flex items-center justify-center text-white'>

              <img src={star} alt="star" />
              <p className='ml-1 font-medium'> Бонусов</p>
              
       </div>

    </>
  )
}

export default MainLogo
