<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 760">
    <defs />
    <defs>
      <linearGradient
        id="a"
        x2=".976"
        y1=".027"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#3b6cf5" />
        <stop offset="1" stop-color="#3b6cf5" />
      </linearGradient>
      <linearGradient
        id="c"
        x2="1"
        y1=".5"
        y2=".5"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#70b3ff" />
        <stop offset="1" stop-color="#4b82f8" />
      </linearGradient>
      <linearGradient
        id="e"
        x1=".972"
        x2=".098"
        y1="1"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#62aeff" />
        <stop offset="1" stop-color="#99c9ff" />
      </linearGradient>
      <filter
        id="b"
        width="166"
        height="356"
        x="50"
        y="228"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dx="-2" dy="6" />
        <feGaussianBlur result="d" stdDeviation="11" />
        <feFlood flood-opacity=".18" />
        <feComposite in2="d" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="d"
        width="231"
        height="441"
        x="100"
        y="228"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dx="-2" dy="6" />
        <feGaussianBlur result="g" stdDeviation="11" />
        <feFlood flood-opacity=".18" />
        <feComposite in2="g" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="f"
        width="498.417"
        height="566.001"
        x="207.583"
        y="103"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dx="-2" dy="6" />
        <feGaussianBlur result="i" stdDeviation="11" />
        <feFlood flood-opacity=".18" />
        <feComposite in2="i" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g fill="url(#a)" stroke="#707070">
      <rect width="760" height="760" stroke="none" rx="210" />
      <rect width="759" height="759" x=".5" y=".5" fill="none" rx="209.5" />
    </g>
    <g filter="url(#b)">
      <path
        fill="url(#c)"
        d="M50 0a50 50 0 0150 50v240H68a68 68 0 01-68-68V50A50 50 0 0150 0z"
        transform="translate(85 255)"
      />
    </g>
    <g filter="url(#d)">
      <path
        fill="url(#e)"
        d="M-1004.5-7630a57.131 57.131 0 01-22.381-4.519 57.307 57.307 0 01-18.277-12.323 57.309 57.309 0 01-12.322-18.276 57.143 57.143 0 01-4.52-22.382V-7955a50.056 50.056 0 00-50-50h165v317.5a57.145 57.145 0 01-4.519 22.382 57.312 57.312 0 01-12.323 18.276 57.305 57.305 0 01-18.277 12.323A57.136 57.136 0 01-1004.5-7630z"
        transform="translate(1247 8260)"
      />
    </g>
    <g filter="url(#f)">
      <path
        fill="#fff"
        d="M600 630H242.583a57.156 57.156 0 0022.3-4.521 57.3 57.3 0 0018.278-12.323 57.3 57.3 0 0012.323-18.276A57.165 57.165 0 00300 572.5V180a49.687 49.687 0 013.929-19.462 49.829 49.829 0 0110.716-15.893 49.835 49.835 0 0115.893-10.716A49.679 49.679 0 01350 130h275a49.68 49.68 0 0119.462 3.929 49.834 49.834 0 0115.893 10.716 49.835 49.835 0 0110.715 15.893A49.686 49.686 0 01675 180v375a74.533 74.533 0 01-5.894 29.194 74.747 74.747 0 01-16.073 23.84 74.745 74.745 0 01-23.839 16.074A74.523 74.523 0 01600 630z"
      />
    </g>
    <path
      fill="#99c9ff"
      d="M367 412a15 15 0 01-15-15v-30a15 15 0 0115-15h120a15 15 0 0115 15v30a15 15 0 01-15 15zm10-105a25 25 0 01-25-25v-75a25 25 0 0125-25h220a25 25 0 0125 25v75a25 25 0 01-25 25z"
    />
  </svg>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class NRLogo extends Vue {}
</script>
