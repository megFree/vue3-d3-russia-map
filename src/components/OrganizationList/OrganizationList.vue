<template>
  <div class="organization-list">
    <div class="organization-list__columns-titles">
      <div
        class="organization-list__title organization-list__title--fixed-width"
      >
        Статус
      </div>
      <div class="organization-list__title organization-list__title-org--grow">
        Организация
      </div>
      <div class="organization-list__title">Кол-во внедрений</div>
    </div>
    <div class="organization-list__items-container">
      <a
        class="organization-list__item"
        v-for="partner in items"
        :key="partner.partner"
        href="#"
      >
        <div class="organization-list__status">
          <div class="organization-list__status-ico">
            <img
              v-if="partner.crucial"
              src="@/assets/images/key.svg"
              alt="Иконка ключевого партнера"
            />
            <img
              v-else-if="partner.certified"
              src="@/assets/images/document.png"
              alt="Иконка сертифицированного партнера"
            />
            <img
              v-else
              src="@/assets/images/home.svg"
              alt="Иконка регионального партнера"
            />
          </div>
          <div v-if="partner.crucial" class="organization-list__status-text">
            Ключевой
          </div>
          <div
            v-else-if="partner.certified"
            class="organization-list__status-text"
          >
            Сертифицированный
          </div>
          <div v-else class="organization-list__status-text">Региональный</div>
        </div>
        <div class="organization-list__organization">
          {{ partner.partner }}
        </div>
        <div class="organization-list__amount">{{ partner.count }}</div>
      </a>
    </div>
  </div>
</template>

<script src="./OrganizationList.js"></script>
<style lang="scss" scoped src="./OrganizationList.scss"></style>
