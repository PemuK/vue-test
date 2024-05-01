<template>
    <form action="">
  <!--  General -->
  <div class="form-group">
    <h2 class="heading">Booking & contact</h2>
    <div class="controls">
      <input type="text" id="name" class="floatLabel" name="name">
      <label for="name">Name</label>
    </div>
    <div class="controls">
      <input type="text" id="email" class="floatLabel" name="email">
      <label for="email">Email</label>
    </div>       
    <div class="controls">
      <input type="tel" id="phone" class="floatLabel" name="phone">
      <label for="phone">Phone</label>
    </div>
      <div class="grid">
        <div class="col-2-3">
          <div class="controls">
           <input type="text" id="street" class="floatLabel" name="street">
           <label for="street">Street</label>
          </div>          
        </div>
        <div class="col-1-3">
          <div class="controls">
            <input type="number" id="street-number" class="floatLabel" name="street-number">
            <label for="street-number">Number</label>
          </div>          
        </div>
      </div>
      <div class="grid">
        <div class="col-2-3">
          <div class="controls">
            <input type="text" id="city" class="floatLabel" name="city">
            <label for="city">City</label>
          </div>         
        </div>
        <div class="col-1-3">
          <div class="controls">
            <input type="text" id="post-code" class="floatLabel" name="post-code">
            <label for="post-code">Post Code</label>
          </div>         
        </div>
      </div>
      <div class="controls">
        <input type="text" id="country" class="floatLabel" name="country">
        <label for="country">Country</label>
      </div>
  </div>
  <!--  Details -->
  <div class="form-group">
    <h2 class="heading">Details</h2>
    <div class="grid">
    <div class="col-1-4 col-1-4-sm">
      <div class="controls">
        <input type="date" id="arrive" class="floatLabel" name="arrive" value="<?php echo date('Y-m-d'); ?>">
        <label for="arrive" class="label-date"><i class="fa fa-calendar"></i>&nbsp;&nbsp;Arrive</label>
      </div>      
    </div>
    <div class="col-1-4 col-1-4-sm">
      <div class="controls">
        <input type="date" id="depart" class="floatLabel" name="depart" value="<?php echo date('Y-m-d'); ?>" />
        <label for="depart" class="label-date"><i class="fa fa-calendar"></i>&nbsp;&nbsp;Depart</label>
      </div>      
    </div>
      </div>
      <div class="grid">
    <div class="col-1-3 col-1-3-sm">
      <div class="controls">
        <i class="fa fa-sort"></i>
        <select class="floatLabel">
          <option value="blank"></option>
          <option value="1">1</option>
          <option value="2" selected>2</option>
          <option value="3">3</option>
        </select>
        <label for="fruit"><i class="fa fa-male"></i>&nbsp;&nbsp;People</label>
      </div>      
    </div>
    <div class="col-1-3 col-1-3-sm">
    <div class="controls">
      <i class="fa fa-sort"></i>
      <select class="floatLabel">
        <option value="blank"></option>
        <option value="deluxe" selected>With Bathroom</option>
        <option value="Zuri-zimmer">Without Bathroom</option>
      </select>
      <label for="fruit">Room</label>
     </div>     
    </div>

    <div class="col-1-3 col-1-3-sm">
    <div class="controls">
      <i class="fa fa-sort"></i>
      <select class="floatLabel">
        <option value="blank"></option>
        <option value="single-bed">Zweibett</option>
        <option value="double-bed" selected>Doppelbett</option>
      </select>
      <label for="fruit">Bedding</label>
     </div>     
    </div>
      
     </div>
      <div class="grid">
        <p class="info-text">Please describe your needs e.g. Extra beds, children's cots</p>
        <br>
        <div class="controls">
          <textarea name="comments" class="floatLabel" id="comments"></textarea>
          <label for="comments">Comments</label>
          </div>
            <button type="submit" value="Submit" class="col-1-4">Submit</button>
      </div>  
  </div> <!-- /.form-group -->
</form>
  </template>
  <script>
    export default {
      data () {
        const srcs = {
          1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        }
  
        return {
          autoUpdate: true,
          friends: ['Sandra Adams', 'Britta Holt'],
          isUpdating: false,
          name: 'Midnight Crew',
          people: [
            // TODO: https://github.com/vuetifyjs/vuetify/issues/15721
            // { header: 'Group 1' },
            { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
            { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
            { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
            { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
            // { divider: true },
            // { header: 'Group 2' },
            { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
            { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
            { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
            { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
          ],
          title: 'The summer breeze',
          timeout: null,
        }
      },
  
      watch: {
        isUpdating (val) {
          clearTimeout(this.timeout)
  
          if (val) {
            this.timeout = setTimeout(() => (this.isUpdating = false), 3000)
          }
        },
      },
  
      methods: {
        remove (item) {
          const index = this.friends.indexOf(item.name)
          if (index >= 0) this.friends.splice(index, 1)
        },
      },
    }
  </script>
<script setup>

</script>
<style lang="scss">

</style>
