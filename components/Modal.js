import Button from "./Button";

function Modal({ title, content, onCancel, onConfirm }) {
  return (
    <div className="h-screen w-full z-10 inset-0 overflow-y-auto absolute">
      <div className="absolute w-full h-full inset-0 bg-gray-500 opacity-75"></div>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 sm:p-0">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>
        <div
          className="inline-block relative overflow-hidden transform transition-all sm:align-middle sm:max-w-lg"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="rounded-lg p-5 bg-white shadow">
              <div className="bg-white dark:bg-gray-800 ">
                <div className="w-full py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                  <h2 className="text-xl font-extrabold text-black dark:text-white sm:text-xl">
                    {title}
                  </h2>
                  <br />
                  <div className="lg:mt-0 lg:flex-shrink-0">{content}</div>
                  <br />
                  <div className="flex flex-row gap-x-4 justify-evenly">
                    <Button label="Annulé" onClick={onCancel} />
                    <Button label="Confirmé" onClick={onConfirm} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
