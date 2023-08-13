package softeer.h9.hey.service.car;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import softeer.h9.hey.domain.car.SelectOption;
import softeer.h9.hey.repository.car.SelectOptionRepository;

@DisplayName("선택 옵션 조회 테스트")
class SelectOptionServiceTest {
	private final SelectOptionRepository selectOptionRepository = Mockito.mock(SelectOptionRepository.class);
	private final SelectOptionService selectOptionService = new SelectOptionService(selectOptionRepository);

	@Test
	@DisplayName("carCode에 해당하는 차량에 적용할 수 있는 선택 옵션 목록을 조회한다.")
	void findSelectOptionTest() {
		SelectOptionRequest selectOptionRequest = new SelectOptionRequest("LXJJ8MST5");
		when(selectOptionRepository.findSelectOptionsByCarCode(any()))
			.thenReturn(List.of(Mockito.mock(SelectOption.class), Mockito.mock(SelectOption.class)));

		SelectOptionsResponse selectOptionResponses = selectOptionService.findSelectOption(selectOptionRequest);
		List<SelectOptionResponse> selectOptions = selectOptionResponses.getSelectOptions();

		assertThat(selectOptions).hasSize(2);
	}

	@Test
	@DisplayName("carCode에 해당하는 차량에 적용할 수 있는 N Performance 옵션 목록을 조회한다.")
	void findNPerformanceOptionTest() {
		SelectOptionRequest selectOptionRequest = new SelectOptionRequest("LXJJ8MST5");
		when(selectOptionRepository.findNPerformanceByCarCode(any()))
			.thenReturn(List.of(
				Mockito.mock(SelectOption.class),
				Mockito.mock(SelectOption.class),
				Mockito.mock(SelectOption.class)));

		SelectOptionsResponse selectOptionResponses = selectOptionService.findNPerformanceOption(selectOptionRequest);
		List<SelectOptionResponse> selectOptions = selectOptionResponses.getSelectOptions();

		assertThat(selectOptions).hasSize(3);
	}
}