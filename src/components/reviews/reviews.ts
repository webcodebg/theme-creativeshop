import * as $ from 'jquery';

/**
 * component options interface.
 */
interface ReviewsOptions {
    /**
     * Namespace of the component.
     * Default: 'cs-'
     * @type {string}
     */
    namespace?: string;

    /**
     * Minimum input value that can be provided.
     * Default: '.cs-reviews__rate-feedback'
     * @type {string}
     */
    feedbackElementSelector?: string;
}

export default class Reviews {
    protected _$wrapper: JQuery<HTMLElement>;
    private _$feedbackEl: JQuery<HTMLElement>
    private _options: ReviewsOptions;

    /**
     * Creates new Reviews component with optional settings.
     * @param  {ReviewsOptions} options  Optional settings object.
     */
    public constructor($wrapper?: JQuery, options?: ReviewsOptions) {
        this._options = $.extend(this._options, options);
        this._options.namespace = this._options.namespace || 'cs-';

        this._$wrapper = $wrapper || $('.cs-reviews__rating-control');
        this._$feedbackEl = this._options.feedbackElementSelector
            ? $(this._options.feedbackElementSelector)
            : $('.cs-reviews__rate-feedback');

        if (this._$wrapper.length && this._$feedbackEl.length) {
            this._attachEvents();
        }
    }

    protected _attachEvents(): void {
        const _this: any = this;
        let msg: string = this._$feedbackEl.data('default-message');
        const $radios: any = _this._$wrapper.find('input[type="radio"]');
        const $icons: any = _this._$wrapper.find('label svg');

        for (let i: number = 0; i < $radios.length; i++) {
            $radios[i].addEventListener('change', function(): void {
                if (
                    _this._$wrapper.find('input[type="radio"]:checked').length
                ) {
                    $icons.each((index: number, element: JQuery) => {
                        $(element).toggleClass("cs-star-rating__form-star--active", index <= i)
                    });

                    msg = _this._$wrapper
                        .find('input[type="radio"]:checked')
                        .data('feedback-message');
                } else {
                    msg = _this._$wrapper.data('default-message');
                }

                _this._$feedbackEl.text(msg);
            });
        }
    }
}