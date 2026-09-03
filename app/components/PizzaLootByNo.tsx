import React from 'react'

const PizzaLootByNo = () => {
    return (

        <section className="bg-[#fffaf3] py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
                        Our Journey
                    </span>

                    <h2 className="mt-5 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        Pizzaloot By The Numbers
                    </h2>

                    <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
                        Every number represents the people, pizzas, and moments that make
                        Pizzaloot special.
                    </p>
                </div>

                {/* Numbers */}
                <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">

                    {/* Card 1 */}
                    <div className="group rounded-3xl border border-orange-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                            🍕
                        </div>

                        <h3 className="mt-5 text-3xl font-black text-gray-900 sm:text-4xl">
                            15K+
                        </h3>

                        <p className="mt-2 text-sm font-medium text-gray-600 sm:text-base">
                            Pizzas Served
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group rounded-3xl border border-orange-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                            ❤️
                        </div>

                        <h3 className="mt-5 text-3xl font-black text-gray-900 sm:text-4xl">
                            10K+
                        </h3>

                        <p className="mt-2 text-sm font-medium text-gray-600 sm:text-base">
                            Happy Customers
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group rounded-3xl border border-orange-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                            📍
                        </div>

                        <h3 className="mt-5 text-3xl font-black text-gray-900 sm:text-4xl">
                            6+
                        </h3>

                        <p className="mt-2 text-sm font-medium text-gray-600 sm:text-base">
                            Pune Locations
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="group rounded-3xl border border-orange-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                            ⭐
                        </div>

                        <h3 className="mt-5 text-3xl font-black text-gray-900 sm:text-4xl">
                            4.8/5
                        </h3>

                        <p className="mt-2 text-sm font-medium text-gray-600 sm:text-base">
                            Customer Rating
                        </p>
                    </div>

                </div>

                {/* Bottom message */}
                <div className="mt-12 rounded-3xl bg-gray-900 px-6 py-8 text-center sm:px-10 sm:py-10">
                    <p className="text-lg font-semibold text-white sm:text-xl">
                        More pizzas. More smiles. More reasons to choose Pizzaloot.
                    </p>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
                        We’re focused on serving fresh food, creating great experiences,
                        and becoming a favourite pizza destination across Pune.
                    </p>
                </div>

            </div>
        </section>

    )
}

export default PizzaLootByNo
