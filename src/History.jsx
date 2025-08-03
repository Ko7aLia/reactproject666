import ethereum from './assets/ethereum.svg'
import bitcoin from './assets/bitcoin.svg'
import dollar from './assets/dollar.svg'
function History() {
  return (
      <>
        <section aria-label="История операций" className='grid place-items-center'>

            <p className='mt-10 text-white'>История</p>

            <div className='max-w-170 mb-4 mt-2 grid grid-cols-3 gap-3'>

                 <div className='box min-w-50 min-h-27 flex p-3'>

                      <div className='box flex max-h-10 min-w-10 items-center justify-center'>

                          <img src={ethereum} className='max-h-6 min-h-6 min-w-6 max-w-6' alt="ethereum" />

                      </div>

                 </div>

                 <div className='box min-w-50 min-h-27 flex p-3'>

                      <div className='box flex max-h-10 min-w-10 items-center justify-center'>

                          <img src={bitcoin} className='max-h-6 min-h-6 min-w-6 max-w-6' alt="bitcoin" />

                      </div>

                 </div>

                 <div className='box min-w-50 min-h-27 flex p-3'>

                      <div className='box flex max-h-10 min-w-10 items-center justify-center'>

                          <img src={dollar} className='max-h-6 min-h-6 min-w-6 max-w-6' alt="dollar" />

                      </div>

                 </div>

            </div>

        </section>
    </>
  );
}

export default History;