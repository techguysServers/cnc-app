import { useRouter } from 'next/router'

function Card({image, tag, title, description, link}) {
  const router = useRouter()
  const handleClick = () => {
    router.push(link)
  }

  return (
    <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
      <a onClick={() => handleClick()} className="w-full block h-full">
        <img
          alt="blog photo"
          src="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=572&q=80"
          className="max-h-40 w-full object-cover"
        />
        <div className="bg-white dark:bg-gray-800 w-full p-4">
          <p className="text-indigo-500 text-md font-medium">{tag}</p>
          <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
            {title}
          </p>
          <p className="text-gray-400 dark:text-gray-300 font-light text-md">
            {description}
          </p>
        </div>
      </a>
    </div>
  );
}

export default Card