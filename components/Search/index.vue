<template>
  <div class="search">
    <div
      class="icon"
      @click="onClick">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M78.1525,6.88c-1.89469,0.26875 -3.225,2.02906 -2.95625,3.92375c0.26875,1.89469 2.02906,3.225 3.92375,2.95625h3.44v7.095c-6.40969,0.33594 -12.59094,1.49156 -18.3825,3.5475l-1.29,-3.44l1.505,-0.645c1.6125,-0.68531 2.45906,-2.45906 1.96188,-4.13875c-0.49719,-1.67969 -2.17688,-2.72781 -3.89688,-2.41875c-0.29562,0.06719 -0.59125,0.17469 -0.86,0.3225l-9.3525,4.085c-1.74687,0.76594 -2.55312,2.82188 -1.77375,4.56875c0.76594,1.74688 2.82188,2.53969 4.56875,1.77375l1.505,-0.645l1.29,3.225c-5.65719,2.71438 -10.8575,6.27531 -15.48,10.4275l-4.945,-5.0525l2.4725,-2.4725c1.075,-1.02125 1.38406,-2.62031 0.7525,-3.96406c-0.645,-1.35719 -2.06937,-2.13656 -3.5475,-1.94844c-0.76594,0.08063 -1.49156,0.43 -2.0425,0.9675l-9.9975,9.9975c-1.33031,1.37063 -1.31687,3.56094 0.05375,4.89125c1.37063,1.33031 3.56094,1.31688 4.89125,-0.05375l2.4725,-2.4725l5.0525,4.945c-4.15219,4.6225 -7.71312,9.82281 -10.4275,15.48l-3.225,-1.29l0.645,-1.505c0.55094,-1.12875 0.45688,-2.45906 -0.25531,-3.49375c-0.72562,-1.02125 -1.935,-1.58562 -3.18469,-1.45125c-0.14781,0.02688 -0.29562,0.06719 -0.43,0.1075c-1.11531,0.22844 -2.02906,0.99438 -2.4725,2.0425l-4.085,9.3525c-0.68531,1.14219 -0.645,2.56656 0.08063,3.66844c0.73906,1.10188 2.0425,1.69313 3.35937,1.505c1.30344,-0.18812 2.40531,-1.11531 2.795,-2.37844l0.645,-1.505l3.44,1.29c-2.05594,5.79156 -3.21156,11.97281 -3.5475,18.3825h-7.095v-3.44c0.04031,-0.99437 -0.36281,-1.94844 -1.075,-2.62031c-0.72562,-0.68531 -1.70656,-1.02125 -2.6875,-0.92719c-0.14781,0.02688 -0.29562,0.06719 -0.43,0.1075c-1.59906,0.36281 -2.72781,1.80063 -2.6875,3.44v13.76c-0.01344,1.23625 0.63156,2.39188 1.70656,3.02344c1.075,0.61813 2.39187,0.61813 3.46687,0c1.075,-0.63156 1.72,-1.78719 1.70656,-3.02344v-3.44h7.095c0.33594,6.40969 1.49156,12.59094 3.5475,18.3825l-3.44,1.29l-0.645,-1.505c-0.60469,-1.38406 -2.0425,-2.21719 -3.5475,-2.0425c-1.08844,0.13438 -2.02906,0.79281 -2.56656,1.74688c-0.52406,0.95406 -0.57781,2.09625 -0.12094,3.09062l4.085,9.3525c0.76594,1.74688 2.82188,2.55313 4.56875,1.77375c1.74688,-0.76594 2.53969,-2.82187 1.77375,-4.56875l-0.645,-1.505l3.225,-1.29c2.71438,5.64375 6.18125,10.87094 10.32,15.48l-4.945,4.945l-2.4725,-2.4725c-0.73906,-0.79281 -1.81406,-1.19594 -2.9025,-1.075c-1.34375,0.13438 -2.48594,1.03469 -2.91594,2.29781c-0.44344,1.27656 -0.09406,2.6875 0.87344,3.61469l9.9975,9.9975c1.37063,1.33031 3.56094,1.31688 4.89125,-0.05375c1.33031,-1.37062 1.31688,-3.56094 -0.05375,-4.89125l-2.4725,-2.4725l4.945,-4.945c4.60906,4.13875 9.83625,7.60563 15.48,10.32l-1.29,3.225l-1.505,-0.645c-0.49719,-0.24187 -1.06156,-0.34937 -1.6125,-0.3225c-1.66625,0.01344 -3.07719,1.20938 -3.37281,2.83531c-0.28219,1.63937 0.63156,3.25187 2.19031,3.82969l9.3525,4.085c1.14219,0.68531 2.56656,0.645 3.66844,-0.08062c1.10188,-0.73906 1.69313,-2.0425 1.505,-3.35938c-0.18812,-1.30344 -1.11531,-2.40531 -2.37844,-2.795l-1.505,-0.645l1.29,-3.44c5.79156,2.05594 11.97281,3.21156 18.3825,3.5475v7.095h-3.44c-0.1075,0 -0.215,0 -0.3225,0c-0.1075,0 -0.215,0 -0.3225,0c-1.89469,0.17469 -3.29219,1.86781 -3.1175,3.7625c0.17469,1.89469 1.86781,3.29219 3.7625,3.1175h13.76c1.23625,0.01344 2.39188,-0.63156 3.02344,-1.70656c0.61813,-1.075 0.61813,-2.39187 0,-3.46687c-0.63156,-1.075 -1.78719,-1.72 -3.02344,-1.70656h-3.44v-7.095c6.40969,-0.33594 12.59094,-1.49156 18.3825,-3.5475l1.29,3.44l-1.505,0.645c-1.26312,0.38969 -2.19031,1.49156 -2.37844,2.795c-0.18813,1.31688 0.40312,2.62031 1.505,3.35938c1.10187,0.72562 2.52625,0.76594 3.66844,0.08062l9.3525,-4.085c1.69313,-0.56437 2.6875,-2.33812 2.2575,-4.07156c-0.41656,-1.74687 -2.09625,-2.87562 -3.87,-2.59344c-0.41656,0.04031 -0.80625,0.14781 -1.1825,0.3225l-1.505,0.645l-1.29,-3.225c5.65719,-2.71437 10.8575,-6.27531 15.48,-10.4275l4.945,5.0525l-2.4725,2.4725c-1.37062,1.33031 -1.38406,3.52063 -0.05375,4.89125c1.33031,1.37063 3.52063,1.38406 4.89125,0.05375l9.9975,-9.9975c1.11531,-1.03469 1.41094,-2.67406 0.73906,-4.03125c-0.65844,-1.37062 -2.15,-2.12312 -3.64156,-1.88125c-0.77937,0.1075 -1.505,0.49719 -2.0425,1.075l-2.4725,2.4725l-5.0525,-4.945c4.15219,-4.6225 7.71313,-9.82281 10.4275,-15.48l3.225,1.29l-0.645,1.505c-0.76594,1.74688 0.02688,3.80281 1.77375,4.56875c1.74688,0.77938 3.80281,-0.02687 4.56875,-1.77375l4.085,-9.3525c0.49719,-1.11531 0.37625,-2.40531 -0.33594,-3.39969c-0.71219,-0.99438 -1.88125,-1.54531 -3.10406,-1.43781c-0.1075,0 -0.215,0 -0.3225,0c-1.11531,0.22844 -2.02906,0.99438 -2.4725,2.0425l-0.645,1.505l-3.44,-1.29c2.05594,-5.79156 3.21156,-11.97281 3.5475,-18.3825h7.095v3.44c-0.01344,1.23625 0.63156,2.39188 1.70656,3.02344c1.075,0.61813 2.39187,0.61813 3.46687,0c1.075,-0.63156 1.72,-1.78719 1.70656,-3.02344v-13.76c0.04031,-0.99437 -0.36281,-1.94844 -1.075,-2.62031c-0.72562,-0.68531 -1.70656,-1.02125 -2.6875,-0.92719c-0.14781,0.02688 -0.29562,0.06719 -0.43,0.1075c-1.59906,0.36281 -2.72781,1.80063 -2.6875,3.44v3.44h-7.095c-0.33594,-6.40969 -1.49156,-12.59094 -3.5475,-18.3825l3.44,-1.29l0.645,1.505c0.38969,1.26313 1.49156,2.19031 2.795,2.37844c1.31688,0.18813 2.62031,-0.40312 3.35938,-1.505c0.72562,-1.10187 0.76594,-2.52625 0.08062,-3.66844l-4.085,-9.3525c-0.61812,-1.42437 -2.10969,-2.27094 -3.655,-2.0425c-1.08844,0.13438 -2.02906,0.79281 -2.56656,1.74688c-0.52406,0.95406 -0.57781,2.09625 -0.12094,3.09062l0.645,1.505l-3.225,1.29c-2.71437,-5.64375 -6.18125,-10.87094 -10.32,-15.48l4.945,-4.945l2.4725,2.4725c1.33031,1.37063 3.52063,1.38406 4.89125,0.05375c1.37063,-1.33031 1.38406,-3.52062 0.05375,-4.89125l-9.9975,-9.9975c-0.645,-0.68531 -1.53187,-1.06156 -2.4725,-1.075c-0.215,0.01344 -0.43,0.05375 -0.645,0.1075c-1.29,0.22844 -2.32469,1.16906 -2.6875,2.41875c-0.36281,1.26313 0.01344,2.60688 0.9675,3.49375l2.4725,2.4725l-4.945,4.945c-4.60906,-4.13875 -9.83625,-7.60562 -15.48,-10.32l1.29,-3.225l1.505,0.645c1.74688,0.76594 3.80281,-0.02687 4.56875,-1.77375c0.77938,-1.74687 -0.02687,-3.80281 -1.77375,-4.56875l-9.3525,-4.085c-0.60469,-0.29562 -1.27656,-0.40312 -1.935,-0.3225c-1.51844,0.22844 -2.70094,1.43781 -2.9025,2.95625c-0.20156,1.51844 0.63156,2.98313 2.0425,3.60125l1.505,0.645l-1.29,3.44c-5.79156,-2.05594 -11.97281,-3.21156 -18.3825,-3.5475v-7.095h3.44c1.23625,0.01344 2.39188,-0.63156 3.02344,-1.70656c0.61813,-1.075 0.61813,-2.39187 0,-3.46687c-0.63156,-1.075 -1.78719,-1.72 -3.02344,-1.70656h-13.76c-0.1075,0 -0.215,0 -0.3225,0c-0.1075,0 -0.215,0 -0.3225,0c-0.1075,0 -0.215,0 -0.3225,0zM85.8925,41.1725c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.07719,-6.88 6.88,-6.88zM110.295,54.61c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.09063,-6.88 6.88,-6.88zM61.5975,54.7175c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.07719,-6.88 6.88,-6.88zM48.0525,79.0125c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.07719,-6.88 6.88,-6.88zM85.8925,79.0125c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.07719,-6.88 6.88,-6.88zM123.84,79.12c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.07719,-6.88 6.88,-6.88zM61.49,103.415c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.07719,-6.88 6.88,-6.88zM110.295,103.415c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.07719,-6.88 6.88,-6.88zM85.8925,116.8525c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.07719,-6.88 6.88,-6.88z"></path></g></g></svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {}
  },
  methods: {
    onClick() {
      console.log('clicked')
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin: 16px auto;
  width: 64px;
  height: 64px;
  cursor: pointer;
  background-color: rgba(39, 39, 39, 1);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  animation: float-up 1s infinite alternate;
}

@keyframes float-up {
  0% {
      transform: translate3d(0, 0px, 0);
 }
  100% {
      transform: translate3d(0, 5px, 0);
 }
}
</style>