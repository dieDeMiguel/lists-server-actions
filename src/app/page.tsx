import { prisma } from "../../lib/prisma";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

export default async function Users({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page: string = params.page as string;
  const users = await prisma.user.findMany({
    take: 6,
    skip: (parseInt(page) - 1) * 6,
  });

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8 pt-12 flex justify-center">
      <div className="w-full sm:w-[600px] md:w-[700px] lg:w-[900px]">
        <div className="flex items-center justify-between">
          <div className="w-full sm:w-80">
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-gray-300 pl-10 focus:ring-0 focus:border-gray-400 focus:outline-none text-sm"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="mt-0 sm:ml-4 flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-6">
            <div className="inline-block min-w-full py-2 align-middle px-6">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3.5 pr-3 text-left text-sm font-semibold w-[62px] sm:w-auto text-gray-900 pl-4">
                        ID
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold w-[130px] sm:w-auto text-gray-900">
                        Name
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold w-[175px] sm:w-auto text-gray-900">
                        Email
                      </th>
                      <th className="relative py-3.5 pl-3 pr-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900 pl-4">
                          {user.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium max-w-[130px] sm:w-auto truncate">
                          {user.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-[175px] sm:w-auto truncate">
                          {user.email}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-4 pr-4 text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                          >
                            Edit
                            <ChevronRightIcon className="w-4 h-4 ml-1" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
