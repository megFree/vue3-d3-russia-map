<template>
  <div class="overall-info">
    <div class="overall-info__item">
      <div class="overall-info__item-ico">
        <img src="@/assets/images/downtown.png" alt="Иконка локации" />
      </div>
      <div class="overall-info__item-content">
        <div class="overall-info__item-title">Локация</div>
        <div class="overall-info__item-value">
          {{ location.name }}
        </div>
      </div>
    </div>
    <div class="overall-info__item">
      <div class="overall-info__item-ico">
        <img
          src="@/assets/images/home.svg"
          alt="Иконка региональных партнеров"
        />
      </div>
      <div class="overall-info__item-content">
        <div class="overall-info__item-title">Региональные партнёры</div>
        <div class="overall-info__item-value">
          {{ location.regionalCounter }}
        </div>
      </div>
    </div>
    <div class="overall-info__item">
      <div class="overall-info__item-ico">
        <img src="@/assets/images/key.svg" alt="Иконка ключевых партнеров" />
      </div>
      <div class="overall-info__item-content">
        <div class="overall-info__item-title">Ключевые партнёры</div>
        <div class="overall-info__item-value">
          {{ location.crucialCounter }}
        </div>
      </div>
    </div>
    <div class="overall-info__item">
      <div class="overall-info__item-ico">
        <img
          src="@/assets/images/document.png"
          alt="Иконка сертифицированных партнеров"
        />
      </div>
      <div class="overall-info__item-content">
        <div class="overall-info__item-title">
          Сертифицированный партнер
        </div>
        <div class="overall-info__item-value">
          {{ location.certifiedCounter }}
        </div>
      </div>
    </div>
    <div class="overall-info__item">
      <div class="overall-info__item-ico">
        <img
          src="@/assets/images/connection.png"
          alt="Иконка количества внедрений"
        />
      </div>
      <div class="overall-info__item-content">
        <div class="overall-info__item-title">Количество внедрений</div>
        <div class="overall-info__item-value">
          {{ location.implementationCounter }}
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./OverallInfo.js"></script>
<style lang="scss" scoped src="./OverallInfo.scss"></style>
