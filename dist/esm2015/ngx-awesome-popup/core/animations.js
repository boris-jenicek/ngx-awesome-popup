import { animate, state, style, transition, trigger } from '@angular/animations';
export function fadeInOut(_OpacityMin = 0, _OpacityMax = 1) {
    return trigger('fadeInOut', [
        // ...
        state('open', style({
            opacity: _OpacityMax
        })),
        state('closed', style({
            opacity: _OpacityMin
        })),
        transition('* => close-fast', [
            animate('0.1s')
        ]),
        transition('* => open', [
            animate('0.2s')
        ]),
        transition('* => close-slow', [
            animate('1.3s')
        ]),
        transition('* => close-instant', [
            animate('0s')
        ])
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRy9FLE1BQU0sVUFBVSxTQUFTLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsQ0FBQztJQUV6RCxPQUFPLE9BQU8sQ0FBQyxXQUFXLEVBQUU7UUFDM0IsTUFBTTtRQUNOLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO1lBQ25CLE9BQU8sRUFBRSxXQUFXO1NBQ3BCLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxXQUFXO1NBQ3BCLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTtZQUM3QixPQUFPLENBQUMsTUFBTSxDQUFDO1NBQ2YsQ0FBQztRQUNGLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDdkIsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNmLENBQUM7UUFDRixVQUFVLENBQUMsaUJBQWlCLEVBQUU7WUFDN0IsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNmLENBQUM7UUFDRixVQUFVLENBQUMsb0JBQW9CLEVBQUU7WUFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQztTQUNiLENBQUM7S0FDRixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXJ9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBmYWRlSW5PdXQoX09wYWNpdHlNaW4gPSAwLCBfT3BhY2l0eU1heCA9IDEpIHtcblxuXHRyZXR1cm4gdHJpZ2dlcignZmFkZUluT3V0JywgW1xuXHRcdC8vIC4uLlxuXHRcdHN0YXRlKCdvcGVuJywgc3R5bGUoe1xuXHRcdFx0b3BhY2l0eTogX09wYWNpdHlNYXhcblx0XHR9KSksXG5cdFx0c3RhdGUoJ2Nsb3NlZCcsIHN0eWxlKHtcblx0XHRcdG9wYWNpdHk6IF9PcGFjaXR5TWluXG5cdFx0fSkpLFxuXHRcdHRyYW5zaXRpb24oJyogPT4gY2xvc2UtZmFzdCcsIFtcblx0XHRcdGFuaW1hdGUoJzAuMXMnKVxuXHRcdF0pLFxuXHRcdHRyYW5zaXRpb24oJyogPT4gb3BlbicsIFtcblx0XHRcdGFuaW1hdGUoJzAuMnMnKVxuXHRcdF0pLFxuXHRcdHRyYW5zaXRpb24oJyogPT4gY2xvc2Utc2xvdycsIFtcblx0XHRcdGFuaW1hdGUoJzEuM3MnKVxuXHRcdF0pLFxuXHRcdHRyYW5zaXRpb24oJyogPT4gY2xvc2UtaW5zdGFudCcsIFtcblx0XHRcdGFuaW1hdGUoJzBzJylcblx0XHRdKVxuXHRdKTtcbn1cbiJdfQ==