function footer() {
    return (
        <>
            <footer className='flex flex-col place-items-center gap-1 md:flex-row'>

                <p className='hidden h-[12px] text-sm text-stone-600 md:block'>Cлужба поддержки:</p>

                <a href="@" className='h-[16px] text-sm text-white'> support@example.com</a>

                <a href="@" className='h-[16px] text-sm text-white md:ml-auto'>Пользовательское соглашение</a>

      </footer>
        </>
  );
}

export default footer;