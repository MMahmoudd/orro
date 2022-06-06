<template>
  <div class="account myOrders-component">
    <b-table :items="orders" :fields="fields">
      <template #cell(Order)="item">
        <b class="text-color">{{ item.item.id }}</b>
      </template>
      <template #cell(Date)="item">
        <p>{{ item.item.created_at }}</p>
      </template>
      <template #cell(Status)="item">
        <b class="text-color">{{ item.item.status }}</b>
      </template>
      <template #cell(Total)="item">
        <p>{{ item.item.total }} LE</p>
      </template>
      <template #cell(Actions)="item">
        <p class="text-color click" @click="showData(item.item)">
          <i class="fa fa-eye"></i>
        </p>
      </template>
    </b-table>
    <b-modal v-model="showDetails" size="l" centered title="BootstrapVue">
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <b-button
          class="close"
          size="sm"
          variant="outline-danger"
          @click="close()"
        >
          <i class="fas fa-times"></i>
        </b-button>
      </template>
      <h2 class="header-section text-center mb-5" style="color: red;">
        {{ $t("profile.orderDetails") }}
        <br />
       # {{ product.id }}

        <hr style="width: 100%" />
      </h2>
      <!-- //////////////////// -->
      <div class="row mt-5 text-center">
        <div class="col-md-4 price" v-if="product.id">{{$t("checkout.date")}}</div>

        <div class="col-md-8">
          {{ product.created_at }}
        </div>
        <div class="col-md-4 price" v-if="product.id"> {{$t("checkout.payment")}}</div>

        <div class="col-md-8">
          {{ product.payment_type }}
        </div>
        <div class="col-md-4 price">
          {{ $t("profile.addressCastoumer") }}
        </div>
        <div class="col-md-8" v-if="product.address">
          <p v-text="product.address.street_address" />
        </div>
      </div>
      <hr style="width: 100%" />
      <div
        class="row mt-4 text-center"
        v-for="item in product.producuts"
        :key="item.id"
      >
        <div class="col-md-4 price">
          {{ item.qty }} {{ item.productable.name_translate }}
        </div>
        <div class="col-md-8" style="color: red;">{{ item.total_price }} LE</div>
     </div>

      <div class="row mt-2 text-center">
          <div class="col-md-4 price">{{$t('checkout.delivery')}}</div>
        <div class="col-md-8" style="color: red;">{{ product.delivery_price }} LE</div>

        <div class="col-md-4 price">{{$t('checkout.tax')}}</div>
        <div class="col-md-8" style="color: red;" >{{ product.tax }} LE</div>

        <!-- <div class="col-md-4 price">Sub Total</div>
        <div class="col-md-8">{{ product.sub_total }} LE</div> -->

        <div class="col-md-4 price">{{$t('checkout.total')}}</div>
        <div class="col-md-8" style="color: red;">{{ product.total }} LE</div>
      </div>
        <hr style="width: 100%" />
 <h4 class="header-section text-center " style="color: red;">{{$t("checkout.PaymentReceived")}}
</h4>
<h6 class="header-section text-center " style="color: red;">{{$t("checkout.Thankyou")}}
</h6>

      <!-- <div
        class="row text-center mb-3"
        v-for="item in product.producuts"
        :key="item.id"
      >
        <div class="col-md-4 price">
      quantity  {{ item.qty }}


        </div>
        <div class="col-md-4 price">
          {{ item.productable.name_translate }} {{ item.size_name }}
        </div>
        <div class="col-md-4 price">
          {{ item.total_price }}
        </div>
      </div> -->

      <!-- ///////////////// -->
      <!-- <div class="row mt-5 text-center">

      </div> -->

    </b-modal>
  </div>
</template>
<script>
import Order from "../../services/Order";
import { ServiceFactory } from "../../services/ServiceFactory";

const Service = ServiceFactory.get("orders");
export default {
  name: "products",
  data: () => ({
    showDetails: false,
    product: {},
    orders: [],
    fields: ["Order", "Date", "Status", "Total", "Actions"],
  }),
  created() {
    this.getUserOrder();
  },
  computed: {},
  methods: {
    async getUserOrder() {
      const UserOrders = await Service.getOrders();
      if (UserOrders.status === true) {
        this.orders = UserOrders.my_orders;
      } else {
        this.ErrorMessage = "Something Error";
        // this.ErrorMessage = getGovernrate.message[0]
        setTimeout(() => {
          this.ErrorMessage = "";
        }, 1500);
      }
    },
    showData(productItem) {
      console.log("productItem", productItem);
      this.showDetails = true;
      this.product = productItem;
    },
  },
};
</script>
