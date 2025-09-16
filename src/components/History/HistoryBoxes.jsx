import DragSvgLock from '../../components/DragSvgLock/DragSvgLock.jsx'
import usdt from '../../assets/tether.svg';
import accept from '../../assets/accept.svg';

const HistoryBoxes = () => {
    
    return (
        <div className="custom-box h-[118px] w-[220px] p-[12px]">
        
            <div className="flex gap-[8px] h-[62px] w-[196px]">

                <div className="custom-box flex h-[40px] w-[40px] items-center justify-center">
                  <DragSvgLock>
                      <img src={usdt} className="h-[24px] w-[24px]" alt="usdt" />
                  </DragSvgLock>
                </div>

                <div className="flex flex-col h-[62px] w-[148px]">

                    <div className="flex gap-[4px] h-[20px]"> 

                        <p className="font-bold text-[16px]">146.3</p> <p className="mt-[6px] font-normal text-[10px] opacity-[40%]">USDT</p>
                    
                    </div>

                    <p className="opacity-[30%] mt-[3px] h-auto leading-[11px] font-normal text-[10px] col-span-2 break-all">drdrz444xcsdf99w554efvfgerwqsacx4zcsdcdvbdf8bdx</p>
                    <p className="font-normal mt-[1px] text-[12px] col-span-2 h-[14px]">12.03.2025</p>
                
                </div>
    
            </div>

            <div className="flex gap-[8px] items-center mt-[10px] h-[20px] w-[196px]">
                
                <div className="flex custom-box items-center justify-center ml-[5px] h-[23px] w-[35px]"><img src={accept}></img></div> <p className="font-normal text-[10px] text-[rgb(58,_198,_125)]">Транзакция завершена</p>
                
            </div>
        
        </div>

    );
};

export default HistoryBoxes;