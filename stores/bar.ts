// stores/counter.ts

import { defineStore } from 'pinia';

interface Beverage {
    name: string;
    price: number;
}

export const useBarStore = defineStore('bar', {
    state: () => {
        return {
            count: 0,
            openTab: [] = [],
            isNewUser: true,
            userBill: {},
            totalBill: 0,
            totalBillAfterSplit: 0,
        }
    },
    getters: {
        getCount: (state) => state.count,
        getOpenTab: (state) => state.openTab,
        getTotalBill: (state) => state.totalBill,
        getTotalBillAfterSplit: (state) => state.totalBillAfterSplit,
        getUserBill: (state) => state.userBill,
    },
    actions: {
        increment() {
            this.count++;
        },
        addToTab(currentUser: any, selectedBeverage: any, selectedBeverageCount: any) {
            // if (event) {

            if (currentUser === null || currentUser === undefined) {
                // this.$toast.warning(`Please enter client name`);
                return;
            };

            if (selectedBeverage === null || selectedBeverage === undefined) {
                // this.$toast.warning(`Please select beverage`);
                return;
            };

            if (selectedBeverageCount < 1) {
                // this.$toast.warning(`Please enter correct number for each beverage`);
                return;
            };

            if (selectedBeverage !== null || selectedBeverage !== undefined) {

                // Check if user exists
                this.openTab?.map((element: any) => {
                    if (element.user === currentUser) {
                        this.isNewUser = false;

                        element.order.push({
                            name: selectedBeverage.name,
                            count: selectedBeverageCount,
                            price: selectedBeverage.price,
                        });

                        // this.$toast.success(`Order for ${element.user} has been added`);
                    }
                });

                // Check if new user
                if (this.isNewUser === true) {
                    this.openTab.push({
                        user: currentUser,
                        order: [
                            {
                                name: selectedBeverage.name,
                                count: selectedBeverageCount,
                                price: selectedBeverage.price,
                            }
                        ]
                    });

                    // this.$toast.success(`Order for ${this.currentUser.value} has been created`);
                }
            }
            // }

            this.isNewUser = true;
        },
        clearTabFields() {
            this.currentUser.value = "";
            this.selectedBeverage.value = "";
            this.selectedBeverageCount.value = 0;

            this.$toast.success(`Orders have been cleared`);
        },
        clearOrderFields() {
            this.currentUserBillName.value = "";
            this.numberOfPeople.value = 0;

            this.$toast.success(`Bill have been cleared`);
        },
        requestBill(currentUserBillName: any, numberOfPeople: any) {
            if (currentUserBillName == "") {
                // this.$toast.warning(`Please enter name of client`);
            }

            // Check if user exists
            this.openTab?.map((element: any) => {
                if (element.user === currentUserBillName) {
                    // this.$toast.success(`Request for ${this.currentUserBillName.value} is being processed`);

                    this.userBill = element;
                }
            });

            let sum = 0;

            this.userBill.order.map((bill: any) => {
                sum += bill.count;
                this.totalBill += bill.count * bill.price;
            });

            if (numberOfPeople > 0) {
                this.totalBillAfterSplit = this.totalBill / numberOfPeople
            }
        },
    }
})