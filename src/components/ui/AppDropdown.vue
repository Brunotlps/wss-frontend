<script setup>
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
} from 'radix-vue'

defineProps({
  align: { type: String, default: 'end' }, // start | center | end
  sideOffset: { type: Number, default: 8 },
})
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        :side-offset="sideOffset"
        :align="align"
        class="z-50 min-w-[200px] rounded-xl border border-slate-200 bg-white p-1 shadow-xl focus:outline-none dark:border-white/10 dark:bg-dm-navy-800"
      >
        <slot />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
