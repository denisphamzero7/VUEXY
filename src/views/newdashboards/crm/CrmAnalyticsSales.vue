<script setup>
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()

const series = [
  {
    name: 'Bán hàng',
    data: [
      32,
      27,
      27,
      30,
      25,
      25,
    ],
  },
  {
    name: 'Lượt truy cập',
    data: [
      25,
      35,
      20,
      20,
      20,
      20,
    ],
  },
]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const borderColor = `rgba(${ hexToRgb(String(variableTheme['border-color'])) },${ variableTheme['border-opacity'] })`
  const labelColor = `rgba(${ hexToRgb(currentTheme['on-surface']) },${ variableTheme['disabled-opacity'] })`
  const legendColor = `rgba(${ hexToRgb(currentTheme['on-background']) },${ variableTheme['medium-emphasis-opacity'] })`
  
  return {
    chart: {
      type: 'radar',
      toolbar: { show: false },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: borderColor,
          connectorColors: borderColor,
        },
      },
    },
    stroke: {
      show: false,
      width: 0,
    },
    legend: {
      show: true,
      fontSize: '13px',
      position: 'bottom',
      labels: {
        colors: legendColor,
        useSeriesColors: false,
      },
      markers: {
        height: 12,
        width: 12,
        offsetX: -8,
      },
      itemMargin: { horizontal: 10 },
      onItemHover: { highlightDataSeries: false },
    },
    colors: [
      currentTheme.primary,
      currentTheme.info,
    ],
    fill: {
      opacity: [
        1,
        0.85,
      ],
    },
    markers: { size: 0 },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: -5,
      },
    },
    xaxis: {
      categories: [
        'Thg 1',
        'Thg 2',
        'Thg 3',
        'Thg 4',
        'Thg 5',
        'Thg 6',
      ],
      labels: {
        show: true,
        style: {
          colors: [
            labelColor,
            labelColor,
            labelColor,
            labelColor,
            labelColor,
            labelColor,
          ],
          fontSize: '13px',
          fontFamily: 'Public Sans',
        },
      },
    },
    yaxis: {
      show: false,
      min: 0,
      max: 40,
      tickAmount: 4,
    },
    responsive: [{
      breakpoint: 769,
      options: { chart: { height: 372 } },
    }],
  }
})

const moreList = [
  {
    title: 'Xem thêm',
    value: 'View More',
  },
  {
    title: 'Xóa',
    value: 'Delete',
  },
]
</script>

<template>
  <VCard>
    <VCardItem class="pb-4">
      <VCardTitle>Bán hàng</VCardTitle>
      <VCardSubtitle>6 tháng gần nhất</VCardSubtitle>

      <template #append>
        <div class="mt-n4 me-n2">
          <MoreBtn
            size="small"
            :menu-list="moreList"
          />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VueApexCharts
        :options="chartOptions"
        :series="series"
        height="290"
      />
    </VCardText>
  </VCard>
</template>
