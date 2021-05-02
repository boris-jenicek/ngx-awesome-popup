import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalClass } from '../../../core/global';
import { ServiceLocator } from '../../../locator.service';
import { ConfirmBoxConfigService } from './confirm-box-config.service';
import { ConfirmBoxService } from './confirm-box-service';
export var ConfirmBoxClass;
(function (ConfirmBoxClass) {
    // region *** Public ***
    class ConfirmBoxInitializer {
        constructor() {
            /** @internal */
            this.confirmBoxCarrier = new ConfirmBoxClass.ConfirmBoxCarrier();
        }
        openConfirmBox$() {
            return this.confirmBoxCarrier.openConfirmBox$().pipe(map(resp => {
                const basicConfirmBoxResponse = new ConfirmBoxResponse();
                const dataControl = new GlobalClass.DataControl();
                dataControl.copyValuesFrom(resp, basicConfirmBoxResponse);
                return basicConfirmBoxResponse;
            }));
        }
        setButtons(_Buttons) {
            this.confirmBoxCarrier.setButtons(_Buttons);
        }
        setConfig(_ConfirmBoxCoreConfig) {
            this.confirmBoxCarrier.setConfig(_ConfirmBoxCoreConfig);
        }
        setDispatch(_Title, _Message = null) {
            this.confirmBoxCarrier.setTitle(_Title);
            this.confirmBoxCarrier.setMessage(_Message);
        }
        setTitle(_Title) {
            this.confirmBoxCarrier.setTitle(_Title);
        }
        setMessage(_Message) {
            this.confirmBoxCarrier.setMessage(_Message);
        }
        setButtonLabels(_Confirm, _Decline) {
            this.confirmBoxCarrier.setButtonLabels(_Confirm, _Decline);
        }
    }
    ConfirmBoxClass.ConfirmBoxInitializer = ConfirmBoxInitializer;
    class ConfirmBoxResponse extends GlobalClass.DataControl {
        constructor() {
            super();
            // private Response: DialogPrepareResponse            = new DialogPrepareResponse();
            this.Success = null;
            this.ClickedButtonID = null;
        }
        setSuccess(_IsSuccess) {
            this.Success = _IsSuccess;
        }
        setClickedButtonID(_ClickedButtonID) {
            this.ClickedButtonID = _ClickedButtonID;
        }
    }
    ConfirmBoxClass.ConfirmBoxResponse = ConfirmBoxResponse;
    class ConfirmBoxEventsController {
        constructor(EntityUniqueID) {
            this.EntityUniqueID = EntityUniqueID;
            this._afterClosed = new Subject();
            this.afterClosed$ = this._afterClosed.asObservable();
            this._onButtonClick = new Subject();
            this.onButtonClick$ = this._onButtonClick.asObservable();
            this._buttonList = new Subject();
            this.buttonList$ = this._buttonList.asObservable();
        }
        close(_Response) {
            const response = _Response ? _Response : this.defaultResponse;
            this._afterClosed.next(response);
        }
        onButtonClick(_Button) {
            this.defaultResponse.setClickedButtonID(_Button.ID);
            this._onButtonClick.next(_Button);
        }
        setButtonList(_ButtonList) {
            this._buttonList.next(_ButtonList);
        }
        setDefaultResponse(_Response) {
            this.defaultResponse = _Response;
        }
    }
    ConfirmBoxClass.ConfirmBoxEventsController = ConfirmBoxEventsController;
    // endregion
    class ConfirmBoxDefaultResponse extends ConfirmBoxResponse {
        constructor() {
            super();
            this.confirmBoxBelonging = null;
        }
        setBelonging(_ConfirmBoxBelonging) {
            this.confirmBoxBelonging = _ConfirmBoxBelonging;
        }
    }
    ConfirmBoxClass.ConfirmBoxDefaultResponse = ConfirmBoxDefaultResponse;
    class ConfirmBoxCarrier {
        constructor() {
            this.confirmBoxBelonging = new ConfirmBoxClass.ConfirmBoxBelonging();
        }
        setButtons(_Buttons) {
            if (_Buttons.length) {
                this.confirmBoxBelonging.Buttons = _Buttons;
            }
        }
        setTitle(_Title) {
            this.confirmBoxBelonging.Dispatch.Title = _Title;
        }
        setMessage(_Message) {
            this.confirmBoxBelonging.Dispatch.Message = _Message;
        }
        setButtonLabels(_Confirm, _Decline) {
            this.confirmBoxBelonging.ConfirmBoxCoreConfig.ConfirmLabel = _Confirm;
            this.confirmBoxBelonging.ConfirmBoxCoreConfig.DeclineLabel = _Decline;
        }
        setConfig(_ConfirmBoxBelonging) {
            // region *** local UserConfig (defined on place where dialog is called) ***
            const dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(_ConfirmBoxBelonging, this.confirmBoxBelonging.ConfirmBoxCoreConfig);
            // endregion
        }
        openConfirmBox$() {
            const service = ServiceLocator.injector.get(ConfirmBoxService);
            const confirmBoxController = service.open(this.confirmBoxBelonging);
            return confirmBoxController.afterClosed$;
        }
    }
    ConfirmBoxClass.ConfirmBoxCarrier = ConfirmBoxCarrier;
    class Settings {
        constructor() {
            this.Buttons = [];
            this.ConfirmBoxCoreConfig = new ConfirmBoxCoreConfig();
            this.Dispatch = new GlobalClass.Dispatch();
        }
    }
    ConfirmBoxClass.Settings = Settings;
    class ConfirmBoxCoreConfig {
        constructor() {
            this.Width = null;
            this.Height = null;
            this.ButtonPosition = null;
            this.LayoutType = null;
            this.Dispatch = null;
            this.ConfirmLabel = null;
            this.DeclineLabel = null;
            this.DisableIcon = null;
            this.AllowHTMLMessage = null;
        }
    }
    ConfirmBoxClass.ConfirmBoxCoreConfig = ConfirmBoxCoreConfig;
    class ConfirmBoxBelonging extends ConfirmBoxClass.Settings {
        constructor() {
            super();
            this.EntityUniqueID = 'C' + Math.random().toString(36).substr(2, 9);
            this.EventsController = new ConfirmBoxEventsController(this.EntityUniqueID);
            const ConfirmBoxCoreConfigurator = ServiceLocator.injector.get(ConfirmBoxConfigService);
            const baseSettings = new ConfirmBoxClass.Settings();
            const dataControl = new GlobalClass.DataControl();
            dataControl.copyValuesFrom(ConfirmBoxCoreConfigurator.productionConfig.ConfirmBoxCoreConfig, baseSettings.ConfirmBoxCoreConfig);
            this.ConfirmBoxCoreConfig = baseSettings.ConfirmBoxCoreConfig;
            this.Buttons = ConfirmBoxCoreConfigurator.productionConfig.Buttons.slice();
        }
    }
    ConfirmBoxClass.ConfirmBoxBelonging = ConfirmBoxBelonging;
})(ConfirmBoxClass || (ConfirmBoxClass = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9jb25maXJtLWJveC9jb3JlL21vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE9BQU8sRUFBQyxXQUFXLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDbEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBbUR4RCxNQUFNLEtBQVcsZUFBZSxDQXVNL0I7QUF2TUQsV0FBaUIsZUFBZTtJQUUvQix3QkFBd0I7SUFHeEIsTUFBYSxxQkFBcUI7UUFJakM7WUFIQSxnQkFBZ0I7WUFDUixzQkFBaUIsR0FBc0MsSUFBSSxlQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUd2RyxDQUFDO1FBRUQsZUFBZTtZQUNkLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQy9ELE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO2dCQUN6RCxNQUFNLFdBQVcsR0FBZSxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDOUQsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztnQkFDMUQsT0FBTyx1QkFBdUIsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELFVBQVUsQ0FBQyxRQUFtQztZQUM3QyxJ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QyxJQUFJLDBCQUEwQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNoSCxNQUFNLDBCQUEwQixHQUE0QixjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ2pILE1BQU0sWUFBWSxHQUEwQyxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzRixNQUFNLFdBQVcsR0FBMkMsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDMUYsV0FBVyxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsRUFBRSxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNoSSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsWUFBWSxDQUFDLG9CQUFvQixDQUFDO1lBQzlELElBQUksQ0FBQyxPQUFPLEdBQWdCLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6RixDQUFDO0tBRUQ7SUFoQlksbUNBQW1CLHNCQWdCL0IsQ0FBQTtBQUdGLENBQUMsRUF2TWdCLGVBQWUsS0FBZixlQUFlLFFBdU0vQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtEaWFsb2dMYXlvdXREaXNwbGF5LCBWZXJ0aWNhbFBvc2l0aW9ufSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW1zJztcbmltcG9ydCB7R2xvYmFsQ2xhc3MsIEdsb2JhbEludGVyZmFjZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWwnO1xuaW1wb3J0IHtTZXJ2aWNlTG9jYXRvcn0gZnJvbSAnLi4vLi4vLi4vbG9jYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7Q29uZmlybUJveENvbmZpZ1NlcnZpY2V9IGZyb20gJy4vY29uZmlybS1ib3gtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHtDb25maXJtQm94U2VydmljZX0gZnJvbSAnLi9jb25maXJtLWJveC1zZXJ2aWNlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25maXJtQm94SW50ZXJmYWNlIHtcblxuXHRleHBvcnQgaW50ZXJmYWNlIElDb25maXJtQm94VXNlckNvbmZpZyB7XG5cdFx0QnV0dG9ucz86IEdsb2JhbEludGVyZmFjZS5JQnV0dG9uW107XG5cdFx0Q29uZmlybUJveENvcmVDb25maWc/OiBDb25maXJtQm94SW50ZXJmYWNlLklDb25maXJtQm94Q29yZUNvbmZpZztcblx0XHREaXNwYXRjaD86IEdsb2JhbEludGVyZmFjZS5JRGlzcGF0Y2g7XG5cdH1cblxuXHRleHBvcnQgaW50ZXJmYWNlIElDb25maXJtQm94Q29yZUNvbmZpZyB7XG5cdFx0LyoqIEZpeGVkIHBvcHVwIHdpZHRoICovXG5cdFx0V2lkdGg/OiBzdHJpbmc7XG5cdFx0LyoqIEZpeGVkIHBvcHVwIGhlaWdodCAqL1xuXHRcdEhlaWdodD86IHN0cmluZztcblx0XHRCdXR0b25Qb3NpdGlvbj86IFZlcnRpY2FsUG9zaXRpb247XG5cdFx0TGF5b3V0VHlwZT86IERpYWxvZ0xheW91dERpc3BsYXk7XG5cdFx0RGlzcGF0Y2g/OiBHbG9iYWxJbnRlcmZhY2UuSURpc3BhdGNoO1xuXHRcdENvbmZpcm1MYWJlbD86IHN0cmluZztcblx0XHREZWNsaW5lTGFiZWw/OiBzdHJpbmc7XG5cdFx0RGlzYWJsZUljb24/OiBib29sZWFuO1xuXHRcdEFsbG93SFRNTE1lc3NhZ2U/OiBib29sZWFuO1xuXHR9XG5cblx0ZXhwb3J0IGludGVyZmFjZSBJQ29uZmlybUJveEJlbG9uZ2luZyB7XG5cdFx0QnV0dG9uczogR2xvYmFsSW50ZXJmYWNlLklCdXR0b25bXTtcblx0XHRDb25maXJtQm94Q29yZUNvbmZpZzogQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveENvcmVDb25maWc7XG5cdFx0RW50aXR5VW5pcXVlSUQ6IHN0cmluZztcblx0XHRFdmVudHNDb250cm9sbGVyOiBDb25maXJtQm94Q2xhc3MuQ29uZmlybUJveEV2ZW50c0NvbnRyb2xsZXI7XG5cdH1cblxuXHRleHBvcnQgaW50ZXJmYWNlIElDb25maXJtQm94UmVzcG9uc2Uge1xuXG5cdFx0c2V0U3VjY2VzcyhfSXNTdWNjZXNzOiBib29sZWFuKTogdm9pZDtcblxuXHRcdHNldENsaWNrZWRCdXR0b25JRChfQ2xpY2tlZEJ1dHRvbklEKTogdm9pZDtcblxuXHR9XG5cblx0ZXhwb3J0IGludGVyZmFjZSBJQ29uZmlybUJveFB1YmxpY1Jlc3BvbnNlIHtcblx0XHRTdWNjZXNzOiBib29sZWFuO1xuXHRcdENsaWNrZWRCdXR0b25JRDogc3RyaW5nXG5cdH1cblxuXHRleHBvcnQgaW50ZXJmYWNlIElQcml2YXRlUmVzcG9uc2VNZXJnZWQgZXh0ZW5kcyBJQ29uZmlybUJveFJlc3BvbnNlLCBHbG9iYWxJbnRlcmZhY2UuSVByaXZhdGVSZXNwb25zZSB7XG5cblx0XHRjb25maXJtQm94QmVsb25naW5nOiBDb25maXJtQm94SW50ZXJmYWNlLklDb25maXJtQm94QmVsb25naW5nO1xuXHR9XG5cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBDb25maXJtQm94Q2xhc3Mge1xuXG5cdC8vIHJlZ2lvbiAqKiogUHVibGljICoqKlxuXG5cblx0ZXhwb3J0IGNsYXNzIENvbmZpcm1Cb3hJbml0aWFsaXplciB7XG5cdFx0LyoqIEBpbnRlcm5hbCAqL1xuXHRcdHByaXZhdGUgY29uZmlybUJveENhcnJpZXI6IENvbmZpcm1Cb3hDbGFzcy5Db25maXJtQm94Q2FycmllciA9IG5ldyBDb25maXJtQm94Q2xhc3MuQ29uZmlybUJveENhcnJpZXIoKTtcblxuXHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdH1cblxuXHRcdG9wZW5Db25maXJtQm94JCgpOiBPYnNlcnZhYmxlPENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZT4ge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29uZmlybUJveENhcnJpZXIub3BlbkNvbmZpcm1Cb3gkKCkucGlwZShtYXAocmVzcCA9PiB7XG5cdFx0XHRcdGNvbnN0IGJhc2ljQ29uZmlybUJveFJlc3BvbnNlID0gbmV3IENvbmZpcm1Cb3hSZXNwb25zZSgpO1xuXHRcdFx0XHRjb25zdCBkYXRhQ29udHJvbCAgICAgICAgICAgICA9IG5ldyBHbG9iYWxDbGFzcy5EYXRhQ29udHJvbCgpO1xuXHRcdFx0XHRkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbShyZXNwLCBiYXNpY0NvbmZpcm1Cb3hSZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybiBiYXNpY0NvbmZpcm1Cb3hSZXNwb25zZTtcblx0XHRcdH0pKTtcblx0XHR9XG5cblx0XHRzZXRCdXR0b25zKF9CdXR0b25zOiBHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbltdKTogdm9pZCB7XG5cdFx0XHR0aGlzLmNvbmZpcm1Cb3hDYXJyaWVyLnNldEJ1dHRvbnMoX0J1dHRvbnMpO1xuXHRcdH1cblxuXHRcdHNldENvbmZpZyhfQ29uZmlybUJveENvcmVDb25maWc6IENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hDb3JlQ29uZmlnKSB7XG5cdFx0XHR0aGlzLmNvbmZpcm1Cb3hDYXJyaWVyLnNldENvbmZpZyhfQ29uZmlybUJveENvcmVDb25maWcpO1xuXHRcdH1cblxuXHRcdHNldERpc3BhdGNoKF9UaXRsZTogc3RyaW5nLCBfTWVzc2FnZTogc3RyaW5nID0gbnVsbCk6IHZvaWQge1xuXHRcdFx0dGhpcy5jb25maXJtQm94Q2Fycmllci5zZXRUaXRsZShfVGl0bGUpO1xuXHRcdFx0dGhpcy5jb25maXJtQm94Q2Fycmllci5zZXRNZXNzYWdlKF9NZXNzYWdlKTtcblx0XHR9XG5cblx0XHRzZXRUaXRsZShfVGl0bGU6IHN0cmluZyk6IHZvaWQge1xuXHRcdFx0dGhpcy5jb25maXJtQm94Q2Fycmllci5zZXRUaXRsZShfVGl0bGUpO1xuXHRcdH1cblxuXHRcdHNldE1lc3NhZ2UoX01lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuXHRcdFx0dGhpcy5jb25maXJtQm94Q2Fycmllci5zZXRNZXNzYWdlKF9NZXNzYWdlKTtcblx0XHR9XG5cblx0XHRzZXRCdXR0b25MYWJlbHMoX0NvbmZpcm06IHN0cmluZywgX0RlY2xpbmU/OiBzdHJpbmcpOiB2b2lkIHtcblx0XHRcdHRoaXMuY29uZmlybUJveENhcnJpZXIuc2V0QnV0dG9uTGFiZWxzKF9Db25maXJtLCBfRGVjbGluZSk7XG5cdFx0fVxuXG5cdH1cblxuXHRleHBvcnQgY2xhc3MgQ29uZmlybUJveFJlc3BvbnNlIGV4dGVuZHMgR2xvYmFsQ2xhc3MuRGF0YUNvbnRyb2wgaW1wbGVtZW50cyBDb25maXJtQm94SW50ZXJmYWNlLklDb25maXJtQm94UmVzcG9uc2UsIENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hQdWJsaWNSZXNwb25zZSB7XG5cdFx0Ly8gcHJpdmF0ZSBSZXNwb25zZTogRGlhbG9nUHJlcGFyZVJlc3BvbnNlICAgICAgICAgICAgPSBuZXcgRGlhbG9nUHJlcGFyZVJlc3BvbnNlKCk7XG5cblx0XHRTdWNjZXNzOiBib29sZWFuICAgICAgICA9IG51bGw7XG5cdFx0Q2xpY2tlZEJ1dHRvbklEOiBzdHJpbmcgPSBudWxsO1xuXG5cdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcdH1cblxuXHRcdHNldFN1Y2Nlc3MoX0lzU3VjY2VzczogYm9vbGVhbik6IHZvaWQge1xuXHRcdFx0dGhpcy5TdWNjZXNzID0gX0lzU3VjY2Vzcztcblx0XHR9XG5cblx0XHRzZXRDbGlja2VkQnV0dG9uSUQoX0NsaWNrZWRCdXR0b25JRCk6IHZvaWQge1xuXHRcdFx0dGhpcy5DbGlja2VkQnV0dG9uSUQgPSBfQ2xpY2tlZEJ1dHRvbklEO1xuXHRcdH1cblxuXG5cdH1cblxuXHRleHBvcnQgY2xhc3MgQ29uZmlybUJveEV2ZW50c0NvbnRyb2xsZXIge1xuXG5cdFx0ZGVmYXVsdFJlc3BvbnNlOiBDb25maXJtQm94SW50ZXJmYWNlLklQcml2YXRlUmVzcG9uc2VNZXJnZWQ7XG5cblx0XHRwcml2YXRlIHJlYWRvbmx5IF9hZnRlckNsb3NlZDogU3ViamVjdDxDb25maXJtQm94SW50ZXJmYWNlLklQcml2YXRlUmVzcG9uc2VNZXJnZWQ+ID0gbmV3IFN1YmplY3Q8Q29uZmlybUJveEludGVyZmFjZS5JUHJpdmF0ZVJlc3BvbnNlTWVyZ2VkPigpO1xuXHRcdGFmdGVyQ2xvc2VkJDogT2JzZXJ2YWJsZTxDb25maXJtQm94SW50ZXJmYWNlLklQcml2YXRlUmVzcG9uc2VNZXJnZWQ+ICAgICAgICAgICAgICAgPSB0aGlzLl9hZnRlckNsb3NlZC5hc09ic2VydmFibGUoKTtcblxuXG5cdFx0cHJpdmF0ZSByZWFkb25seSBfb25CdXR0b25DbGljazogU3ViamVjdDxHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbj4gPSBuZXcgU3ViamVjdDxHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbj4oKTtcblx0XHRvbkJ1dHRvbkNsaWNrJDogT2JzZXJ2YWJsZTxHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbj4gICAgICAgICAgICAgICA9IHRoaXMuX29uQnV0dG9uQ2xpY2suYXNPYnNlcnZhYmxlKCk7XG5cdFx0cHJpdmF0ZSByZWFkb25seSBfYnV0dG9uTGlzdDogU3ViamVjdDxHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbltdPiAgPSBuZXcgU3ViamVjdDxHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbltdPigpO1xuXHRcdGJ1dHRvbkxpc3QkOiBPYnNlcnZhYmxlPEdsb2JhbEludGVyZmFjZS5JQnV0dG9uW10+ICAgICAgICAgICAgICAgID0gdGhpcy5fYnV0dG9uTGlzdC5hc09ic2VydmFibGUoKTtcblxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgRW50aXR5VW5pcXVlSUQ6IHN0cmluZykge1xuXHRcdH1cblxuXG5cdFx0Y2xvc2UoX1Jlc3BvbnNlPzogQ29uZmlybUJveEludGVyZmFjZS5JUHJpdmF0ZVJlc3BvbnNlTWVyZ2VkKTogdm9pZCB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IF9SZXNwb25zZSA/IF9SZXNwb25zZSA6IHRoaXMuZGVmYXVsdFJlc3BvbnNlO1xuXHRcdFx0dGhpcy5fYWZ0ZXJDbG9zZWQubmV4dChyZXNwb25zZSk7XG5cdFx0fVxuXG5cdFx0b25CdXR0b25DbGljayhfQnV0dG9uOiBHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbik6IHZvaWQge1xuXHRcdFx0dGhpcy5kZWZhdWx0UmVzcG9uc2Uuc2V0Q2xpY2tlZEJ1dHRvbklEKF9CdXR0b24uSUQpO1xuXHRcdFx0dGhpcy5fb25CdXR0b25DbGljay5uZXh0KF9CdXR0b24pO1xuXHRcdH1cblxuXHRcdHNldEJ1dHRvbkxpc3QoX0J1dHRvbkxpc3Q6IEdsb2JhbEludGVyZmFjZS5JQnV0dG9uW10pOiB2b2lkIHtcblx0XHRcdHRoaXMuX2J1dHRvbkxpc3QubmV4dChfQnV0dG9uTGlzdCk7XG5cdFx0fVxuXG5cdFx0c2V0RGVmYXVsdFJlc3BvbnNlKF9SZXNwb25zZTogQ29uZmlybUJveEludGVyZmFjZS5JUHJpdmF0ZVJlc3BvbnNlTWVyZ2VkKTogdm9pZCB7XG5cdFx0XHR0aGlzLmRlZmF1bHRSZXNwb25zZSA9IF9SZXNwb25zZTtcblx0XHR9XG5cdH1cblxuXHQvLyBlbmRyZWdpb25cblxuXHRleHBvcnQgY2xhc3MgQ29uZmlybUJveERlZmF1bHRSZXNwb25zZSBleHRlbmRzIENvbmZpcm1Cb3hSZXNwb25zZSBpbXBsZW1lbnRzIENvbmZpcm1Cb3hJbnRlcmZhY2UuSVByaXZhdGVSZXNwb25zZU1lcmdlZCB7XG5cdFx0Y29uZmlybUJveEJlbG9uZ2luZzogQ29uZmlybUJveEJlbG9uZ2luZyA9IG51bGw7XG5cblx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdHN1cGVyKCk7XG5cdFx0fVxuXG5cdFx0c2V0QmVsb25naW5nKF9Db25maXJtQm94QmVsb25naW5nKTogdm9pZCB7XG5cdFx0XHR0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcgPSBfQ29uZmlybUJveEJlbG9uZ2luZztcblx0XHR9XG5cblx0fVxuXG5cdGV4cG9ydCBjbGFzcyBDb25maXJtQm94Q2FycmllciB7XG5cblx0XHRjb25maXJtQm94QmVsb25naW5nOiBDb25maXJtQm94Q2xhc3MuQ29uZmlybUJveEJlbG9uZ2luZyA9IG5ldyBDb25maXJtQm94Q2xhc3MuQ29uZmlybUJveEJlbG9uZ2luZygpO1xuXG5cdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0fVxuXG5cdFx0c2V0QnV0dG9ucyhfQnV0dG9uczogR2xvYmFsSW50ZXJmYWNlLklCdXR0b25bXSkge1xuXHRcdFx0aWYgKF9CdXR0b25zLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuQnV0dG9ucyA9IF9CdXR0b25zO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNldFRpdGxlKF9UaXRsZTogc3RyaW5nKTogdm9pZCB7XG5cdFx0XHR0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuRGlzcGF0Y2guVGl0bGUgPSBfVGl0bGU7XG5cdFx0fVxuXG5cdFx0c2V0TWVzc2FnZShfTWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG5cdFx0XHR0aGlzLmNvbmZpcm1Cb3hCZWxvbmdpbmcuRGlzcGF0Y2guTWVzc2FnZSA9IF9NZXNzYWdlO1xuXHRcdH1cblxuXG5cdFx0c2V0QnV0dG9uTGFiZWxzKF9Db25maXJtOiBzdHJpbmcsIF9EZWNsaW5lOiBzdHJpbmcpOiB2b2lkIHtcblx0XHRcdHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5Db25maXJtQm94Q29yZUNvbmZpZy5Db25maXJtTGFiZWwgPSBfQ29uZmlybTtcblx0XHRcdHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5Db25maXJtQm94Q29yZUNvbmZpZy5EZWNsaW5lTGFiZWwgPSBfRGVjbGluZTtcblx0XHR9XG5cblx0XHRzZXRDb25maWcoX0NvbmZpcm1Cb3hCZWxvbmdpbmc6IENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hDb3JlQ29uZmlnKSB7XG5cdFx0XHQvLyByZWdpb24gKioqIGxvY2FsIFVzZXJDb25maWcgKGRlZmluZWQgb24gcGxhY2Ugd2hlcmUgZGlhbG9nIGlzIGNhbGxlZCkgKioqXG5cdFx0XHRjb25zdCBkYXRhQ29udHJvbCA9IG5ldyBHbG9iYWxDbGFzcy5EYXRhQ29udHJvbCgpO1xuXHRcdFx0ZGF0YUNvbnRyb2wuY29weVZhbHVlc0Zyb20oX0NvbmZpcm1Cb3hCZWxvbmdpbmcsIHRoaXMuY29uZmlybUJveEJlbG9uZ2luZy5Db25maXJtQm94Q29yZUNvbmZpZyk7XG5cdFx0XHQvLyBlbmRyZWdpb25cblx0XHR9XG5cblx0XHRvcGVuQ29uZmlybUJveCQoKTogT2JzZXJ2YWJsZTxDb25maXJtQm94SW50ZXJmYWNlLklQcml2YXRlUmVzcG9uc2VNZXJnZWQ+IHtcblx0XHRcdGNvbnN0IHNlcnZpY2U6IENvbmZpcm1Cb3hTZXJ2aWNlID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KENvbmZpcm1Cb3hTZXJ2aWNlKTtcblx0XHRcdGNvbnN0IGNvbmZpcm1Cb3hDb250cm9sbGVyICAgICAgID0gc2VydmljZS5vcGVuKHRoaXMuY29uZmlybUJveEJlbG9uZ2luZyk7XG5cdFx0XHRyZXR1cm4gY29uZmlybUJveENvbnRyb2xsZXIuYWZ0ZXJDbG9zZWQkO1xuXHRcdH1cblxuXHR9XG5cblx0ZXhwb3J0IGNsYXNzIFNldHRpbmdzIHtcblx0XHRCdXR0b25zOiBHbG9iYWxJbnRlcmZhY2UuSUJ1dHRvbltdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBbXTtcblx0XHRDb25maXJtQm94Q29yZUNvbmZpZzogQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveENvcmVDb25maWcgPSBuZXcgQ29uZmlybUJveENvcmVDb25maWcoKTtcblx0XHREaXNwYXRjaDogR2xvYmFsSW50ZXJmYWNlLklEaXNwYXRjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBuZXcgR2xvYmFsQ2xhc3MuRGlzcGF0Y2goKTtcblx0fVxuXG5cdGV4cG9ydCBjbGFzcyBDb25maXJtQm94Q29yZUNvbmZpZyBpbXBsZW1lbnRzIENvbmZpcm1Cb3hJbnRlcmZhY2UuSUNvbmZpcm1Cb3hDb3JlQ29uZmlnIHtcblx0XHRXaWR0aDogc3RyaW5nICAgICAgICAgICAgICAgICAgICAgICA9IG51bGw7XG5cdFx0SGVpZ2h0OiBzdHJpbmcgICAgICAgICAgICAgICAgICAgICAgPSBudWxsO1xuXHRcdEJ1dHRvblBvc2l0aW9uOiBWZXJ0aWNhbFBvc2l0aW9uICAgID0gbnVsbDtcblx0XHRMYXlvdXRUeXBlOiBEaWFsb2dMYXlvdXREaXNwbGF5ICAgICA9IG51bGw7XG5cdFx0RGlzcGF0Y2g6IEdsb2JhbEludGVyZmFjZS5JRGlzcGF0Y2ggPSBudWxsO1xuXHRcdENvbmZpcm1MYWJlbDogc3RyaW5nICAgICAgICAgICAgICAgID0gbnVsbDtcblx0XHREZWNsaW5lTGFiZWw6IHN0cmluZyAgICAgICAgICAgICAgICA9IG51bGw7XG5cdFx0RGlzYWJsZUljb246IGJvb2xlYW4gICAgICAgICAgICAgICAgPSBudWxsO1xuXHRcdEFsbG93SFRNTE1lc3NhZ2U6IGJvb2xlYW4gICAgICAgICAgID0gbnVsbDtcblx0fVxuXG5cdGV4cG9ydCBjbGFzcyBDb25maXJtQm94QmVsb25naW5nIGV4dGVuZHMgQ29uZmlybUJveENsYXNzLlNldHRpbmdzIGltcGxlbWVudHMgQ29uZmlybUJveEludGVyZmFjZS5JQ29uZmlybUJveEJlbG9uZ2luZyB7XG5cblx0XHRFbnRpdHlVbmlxdWVJRDogc3RyaW5nID0gJ0MnICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpO1xuXHRcdEV2ZW50c0NvbnRyb2xsZXI6IENvbmZpcm1Cb3hFdmVudHNDb250cm9sbGVyO1xuXG5cdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcdFx0dGhpcy5FdmVudHNDb250cm9sbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IENvbmZpcm1Cb3hFdmVudHNDb250cm9sbGVyKHRoaXMuRW50aXR5VW5pcXVlSUQpO1xuXHRcdFx0Y29uc3QgQ29uZmlybUJveENvcmVDb25maWd1cmF0b3I6IENvbmZpcm1Cb3hDb25maWdTZXJ2aWNlID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KENvbmZpcm1Cb3hDb25maWdTZXJ2aWNlKTtcblx0XHRcdGNvbnN0IGJhc2VTZXR0aW5ncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBDb25maXJtQm94Q2xhc3MuU2V0dGluZ3MoKTtcblx0XHRcdGNvbnN0IGRhdGFDb250cm9sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBHbG9iYWxDbGFzcy5EYXRhQ29udHJvbCgpO1xuXHRcdFx0ZGF0YUNvbnRyb2wuY29weVZhbHVlc0Zyb20oQ29uZmlybUJveENvcmVDb25maWd1cmF0b3IucHJvZHVjdGlvbkNvbmZpZy5Db25maXJtQm94Q29yZUNvbmZpZywgYmFzZVNldHRpbmdzLkNvbmZpcm1Cb3hDb3JlQ29uZmlnKTtcblx0XHRcdHRoaXMuQ29uZmlybUJveENvcmVDb25maWcgPSBiYXNlU2V0dGluZ3MuQ29uZmlybUJveENvcmVDb25maWc7XG5cdFx0XHR0aGlzLkJ1dHRvbnMgICAgICAgICAgICAgID0gQ29uZmlybUJveENvcmVDb25maWd1cmF0b3IucHJvZHVjdGlvbkNvbmZpZy5CdXR0b25zLnNsaWNlKCk7XG5cdFx0fVxuXG5cdH1cblxuXG59XG4iXX0=