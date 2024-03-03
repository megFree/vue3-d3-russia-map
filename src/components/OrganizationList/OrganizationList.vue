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
        v-for="company in items"
        :key="company.partner"
        href="#"
      >
        <div class="organization-list__status">
          <div class="organization-list__status-ico">
            <img
              v-if="company.crucial"
              src="@/assets/images/key.svg"
              alt="Иконка ключевого партнера"
            />
            <img
              v-else-if="company.certified"
              src="@/assets/images/document.png"
              alt="Иконка сертифицированного партнера"
            />
            <img
              v-else
              src="@/assets/images/home.svg"
              alt="Иконка регионального партнера"
            />
          </div>
          <div v-if="company.crucial" class="organization-list__status-text">
            Ключевой
          </div>
          <div
            v-else-if="company.certified"
            class="organization-list__status-text"
          >
            Сертифицированный
          </div>
          <div v-else class="organization-list__status-text">Региональный</div>
        </div>
        <div class="organization-list__organization">
          {{ company.partner }}
        </div>
        <div class="organization-list__amount">{{ company.count }}</div>
      </a>
    </div>
  </div>
</template>

<script src="./OrganizationList.js"></script>
<style lang="scss" scoped src="./OrganizationList.scss"></style>
