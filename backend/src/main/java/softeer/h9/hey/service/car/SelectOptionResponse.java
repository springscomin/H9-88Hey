package softeer.h9.hey.service.car;

import java.util.List;
import java.util.stream.Collectors;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import softeer.h9.hey.domain.car.SelectOption;
import softeer.h9.hey.domain.car.SubOption;

@Getter
@Builder
@RequiredArgsConstructor
public class SelectOptionResponse {
	private final String id;
	private final String name;
	private final String imageURL;

	private final List<TagResponse> tags;

	private final List<SubOptionResponses> subOptions;

	public static SelectOptionResponse from(SelectOption selectOption) {
		List<SubOptionResponses> subOptionResponses = getSubOptionResponses(selectOption.getSubOptions());

		return SelectOptionResponse.builder()
			.id(selectOption.getId())
			.name(selectOption.getName())
			.imageURL(selectOption.getImageUrl())
			// #TODO 태그 넣기
			.tags(null)
			.subOptions(subOptionResponses)
			.build();
	}

	private static List<SubOptionResponses> getSubOptionResponses(List<SubOption> subOptions) {
		return subOptions.stream()
			.map(SubOptionResponses::from)
			.collect(Collectors.toList());
	}
}