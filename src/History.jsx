import ethereum from './assets/ethereum.svg'
import bitcoin from './assets/bitcoin.svg'
import dollar from './assets/dollar.svg'
function History() {
  return (
      <>
            <p className='mt-10 flex justify-center text-white'>История</p>

        <div className='place-items-center'>

              <div className='mt-2 mb-[31px] flex flex-row gap-x-3 md:mb-[83px]'>

                 <div className='box h-[118px] w-[220px] p-3'>

                      <div className='box flex h-[40px] w-[40px] items-center justify-center'>

                          <img src={ethereum} className='h-[24px] w-[24px]' alt="ethereum" />

                      </div>

                 </div>

                 <div className='box h-[118px] w-[220px] p-3'>

                      <div className='box flex h-[40px] w-[40px] items-center justify-center'>

                          <img src={bitcoin} className='h-[24px] w-[24px]' alt="bitcoin" />

                      </div>

                 </div>

                 <div className='box h-[118px] w-[220px] p-3'>

                      <div className='box flex h-[40px] w-[40px] items-center justify-center'>

                          <img src={dollar} className='h-[24px] w-[24px]' alt="dollar" />

                      </div>

                 </div>

            </div>

        </div>
    </>
  );
}

export default History;