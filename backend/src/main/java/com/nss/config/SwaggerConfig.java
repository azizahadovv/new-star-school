package com.nss.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.parameters.RequestBody;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI combinedOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        return new OpenAPI()
                .addServersItem(new Server().url("https://newstarschool.uz"))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT"))
                        .addRequestBodies("file-upload",
                                new RequestBody()
                                        .content(new Content().addMediaType(org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE,
                                                new MediaType().schema(new Schema<>()
                                                        .type("object")
                                                        .addProperty("file", new Schema<>()
                                                                .type("string")
                                                                .format("binary")))))))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .info(new Info().title("New Star School API")
                        .version("1.0")
                        .description("UEFA application API documentation"));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public")
                .pathsToMatch("/**")
                .addOpenApiCustomizer(
                        openApi ->
                                openApi.addServersItem(new Server().url("https://newstarschool.uz")))
                .build();
    }
}
