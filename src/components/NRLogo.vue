<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="760"
    height="760"
    viewBox="0 0 760 760"
  >
    <defs>
      <linearGradient
        id="a"
        y1="0.5"
        x2="1"
        y2="0.5"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#70b3ff" />
        <stop offset="1" stop-color="#4b82f8" />
      </linearGradient>
      <filter
        id="b"
        x="50"
        y="228"
        width="166"
        height="356"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dx="-2" dy="6" input="SourceAlpha" />
        <feGaussianBlur stdDeviation="11" result="c" />
        <feFlood flood-opacity="0.18" />
        <feComposite operator="in" in2="c" />
        <feComposite in="SourceGraphic" />
      </filter>
      <linearGradient
        id="d"
        x1="0.972"
        y1="1"
        x2="0.098"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#62aeff" />
        <stop offset="1" stop-color="#99c9ff" />
      </linearGradient>
      <filter
        id="e"
        x="100"
        y="228"
        width="231"
        height="441"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dx="-2" dy="6" input="SourceAlpha" />
        <feGaussianBlur stdDeviation="11" result="f" />
        <feFlood flood-opacity="0.18" />
        <feComposite operator="in" in2="f" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="g"
        x="207.583"
        y="103"
        width="498.417"
        height="566.001"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dx="-2" dy="6" input="SourceAlpha" />
        <feGaussianBlur stdDeviation="11" result="h" />
        <feFlood flood-opacity="0.18" />
        <feComposite operator="in" in2="h" />
        <feComposite in="SourceGraphic" />
      </filter>
      <clipPath id="j"><rect width="760" height="760" /></clipPath>
    </defs>
    <g id="i" clip-path="url(#j)">
      <g transform="translate(-120 -120)">
        <g transform="translate(-24 -7)">
          <g transform="matrix(1, 0, 0, 1, 144, 127)" filter="url(#b)">
            <path
              d="M50,0h0a50,50,0,0,1,50,50V290a0,0,0,0,1,0,0H68A68,68,0,0,1,0,222V50A50,50,0,0,1,50,0Z"
              transform="translate(85 255)"
              fill="url(#a)"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 144, 127)" filter="url(#e)">
            <path
              d="M-1004.5-7630a57.131,57.131,0,0,1-22.381-4.519,57.307,57.307,0,0,1-18.277-12.323,57.309,57.309,0,0,1-12.322-18.276A57.143,57.143,0,0,1-1062-7687.5V-7955a50.056,50.056,0,0,0-50-50h165v317.5a57.145,57.145,0,0,1-4.519,22.382,57.312,57.312,0,0,1-12.323,18.276,57.305,57.305,0,0,1-18.277,12.323A57.136,57.136,0,0,1-1004.5-7630Z"
              transform="translate(1247 8260)"
              fill="url(#d)"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 144, 127)" filter="url(#g)">
            <path
              d="M-697-7505h-357.417a57.156,57.156,0,0,0,22.3-4.521,57.3,57.3,0,0,0,18.278-12.323,57.3,57.3,0,0,0,12.323-18.276A57.165,57.165,0,0,0-997-7562.5V-7955a49.687,49.687,0,0,1,3.929-19.462,49.829,49.829,0,0,1,10.716-15.893,49.835,49.835,0,0,1,15.893-10.716A49.679,49.679,0,0,1-947-8005h275a49.68,49.68,0,0,1,19.462,3.929,49.834,49.834,0,0,1,15.893,10.716,49.835,49.835,0,0,1,10.715,15.893A49.686,49.686,0,0,1-622-7955v375a74.533,74.533,0,0,1-5.894,29.194,74.747,74.747,0,0,1-16.073,23.84,74.745,74.745,0,0,1-23.839,16.074A74.523,74.523,0,0,1-697-7505Z"
              transform="translate(1297 8135)"
              fill="currentColor"
            />
          </g>
          <path
            d="M-1147-7775a15,15,0,0,1-15-15v-30a15,15,0,0,1,15-15h120a15,15,0,0,1,15,15v30a15,15,0,0,1-15,15Zm10-105a25,25,0,0,1-25-25v-75a25,25,0,0,1,25-25h220a25,25,0,0,1,25,25v75a25,25,0,0,1-25,25Z"
            transform="translate(1658 8314)"
            fill="#99c9ff"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class NRLogo extends Vue {}
</script>
