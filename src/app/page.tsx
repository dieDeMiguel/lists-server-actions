import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import SearchInput from "./search-input";
import { Suspense } from "react";
import { Spinner } from "./components/spinner";
import { User } from "@/interfaces/user";

export default async function Users({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : undefined;

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8 pt-12 flex flex-col items-center justify-center">
      <div className="w-full sm:w-[600px] md:w-[700px] lg:w-[900px]">
        <div className="flex items-center justify-between">
          <div className="w-full sm:w-80">
            <SearchInput search={search} />
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
      </div>
      <Suspense fallback={<Loading />}>
        <UsersTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
async function UsersTable({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const perPage = 7;
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : undefined;
  const totalUsers = await prisma.user.count({
    where: {
      name: {
        contains: search,
      },
    },
  });
  const totalPages = Math.ceil(totalUsers / perPage);
  const page: number =
    typeof params.page === "string" &&
    +params.page > 1 &&
    +params.page <= totalPages
      ? +params.page
      : 1;
  const users = await prisma.user.findMany({
    take: 6,
    skip: (page - 1) * 6,
    where: {
      name: {
        contains: search,
      },
    },
  });

  const currentSearchParams = new URLSearchParams();
  if (search) {
    currentSearchParams.set("search", search);
  }
  if (page > 1) {
    currentSearchParams.set("page", page.toString());
  }
  return (
    <div className="w-full sm:w-[600px] md:w-[700px] lg:w-[900px]">
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
                  {users.map((user: User) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900 pl-4">
                        {user.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-medium max-w-[130px] sm:w-auto truncate">
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
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-semibold">{(page - 1) * perPage + 1}</span> to{" "}
          <span className="font-semibold">
            {Math.min(page * perPage, totalUsers)}
          </span>{" "}
          of <span className="font-semibold">{totalUsers}</span> users
        </p>
        <div className="space-x-2">
          <PreviousLink currentSearchParams={currentSearchParams} page={page} />
          <NextLink
            currentSearchParams={currentSearchParams}
            page={page}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
function Loading() {
  return (
    <div className="flex h-full items-center grow justify-center">
      <Spinner className="w-8 animate-spin" />
    </div>
  );
}

const PreviousLink = ({
  currentSearchParams,
  page,
}: {
  currentSearchParams: URLSearchParams;
  page: number;
}) => {
  const newSearchParams = new URLSearchParams(currentSearchParams);
  if (page > 2) {
    newSearchParams.set("page", `${page - 1}`);
  } else {
    newSearchParams.delete("page");
  }
  return page > 1 ? (
    <Link
      href={`/?${newSearchParams}`}
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
    >
      Previous
    </Link>
  ) : (
    <button
      disabled
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 opacity-50"
    >
      Previous
    </button>
  );
};
const NextLink = ({
  currentSearchParams,
  page,
  totalPages,
}: {
  currentSearchParams: URLSearchParams;
  page: number;
  totalPages: number;
}) => {
  const newSearchParams = new URLSearchParams(currentSearchParams);
  newSearchParams.set("page", `${page + 1}`);
  return page < totalPages ? (
    <Link
      href={`/?${newSearchParams}`}
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
    >
      Next
    </Link>
  ) : (
    <button
      disabled
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 opacity-50"
    >
      Next
    </button>
  );
};
